import { readFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Dictionary, FormatFn, TransformedToken } from "style-dictionary/types";
import { splitResponsiveTokens } from "./responsive-helpers";
import { formatAccessor, toCamelCase } from "./responsive-object";
import { buildTailwindTheme, fontWeight } from "./tailwind-theme";

export const storybookCatalogFormatName = "storybook/catalog";
export const storybookStoriesFormatName = "storybook/stories";

export type DocumentationToken = {
  path: string;
  name: string;
  description?: string;
  value: string | number;
  desktopValue?: string | number;
  group: string;
  usage: Record<"css" | "scss" | "js" | "tailwind", string>;
  preview: { kind: string; style: Record<string, string | undefined> };
  desktopPreview?: { kind: string; style: Record<string, string | undefined> };
};

export type DocumentationCategory = {
  name: string;
  tokens: DocumentationToken[];
};

export type DocumentationCatalog = {
  desktopBreakpoint: string;
  categories: DocumentationCategory[];
};

const cssVariable = (token: TransformedToken, unit?: string) =>
  unit && typeof token.value === "number"
    ? `calc(var(--axa-${token.name}) * 1${unit})`
    : `var(--axa-${token.name})`;

const presentation = (token: TransformedToken, category: string) => {
  const [root] = token.path;
  const leaf = token.path.at(-1);
  if (token.type === "color") {
    const property = root === "bg" ? "background-color"
      : root === "stroke" ? "border-color"
      : root === "focus" ? "outline-color" : "color";
    return { property, kind: "color" };
  }
  if (category === "Motion") {
    return { property: "transition-duration", unit: "ms", kind: "value" };
  }
  if (root === "radius") {
    return { property: "border-radius", unit: leaf === "circle" ? "%" : "px", kind: "shape" };
  }
  if (root === "fontSize" || leaf === "font-size") {
    return { property: "font-size", unit: "px", kind: "typography" };
  }
  if (root === "lineHeight" || leaf === "line-height") {
    return { property: "line-height", unit: "px", kind: "typography" };
  }
  if (root === "font-family" || leaf?.endsWith("font-family")) {
    return { property: "font-family", kind: "typography" };
  }
  if (leaf === "letter-spacing" || root === "letter-spacings") {
    return { property: "letter-spacing", unit: "px", kind: "typography" };
  }
  if (root === "blur") {
    return { property: "filter", unit: "px", kind: "blur" };
  }
  if (root === "column") {
    return { property: "grid-template-columns", kind: "value" };
  }
  if (root === "container") {
    return { property: "max-width", unit: "px", kind: "spacing" };
  }
  if (root === "stroke" && token.path[1] === "width") {
    return { property: "border-width", unit: "px", kind: "shape" };
  }
  if (category === "Spacing" || category === "Grid") {
    return { property: root === "padding" ? "padding" : "gap", unit: "px", kind: "spacing" };
  }
  return { property: "--example", kind: "value" };
};

const tailwindPrefixes: Record<string, string> = {
  colors: "bg", borderRadius: "rounded", spacing: "gap",
  fontSize: "text", lineHeight: "leading", fontFamily: "font",
  fontWeight: "font", letterSpacing: "tracking", blur: "blur",
  borderWidth: "border", maxWidth: "max-w", boxShadow: "shadow",
};

const sourceCategories = async () => {
  const root = fileURLToPath(new URL("../tokens/export/", import.meta.url));
  const categories = new Map<string, string>();
  const files = await readdir(root, { recursive: true, withFileTypes: true });
  for (const file of files) {
    const category = relative(root, file.parentPath).split(sep)[0];
    if (!file.isFile() || !file.name.endsWith(".json") || !category || /primitives/i.test(category)) {
      continue;
    }
    const collect = (node: unknown, path: string[] = []) => {
      if (typeof node !== "object" || node === null) {
        return;
      }
      if ("value" in node) {
        const key = path.join(".");
        const existing = categories.get(key);
        if (existing && existing !== category) {
          throw new Error(`Token "${key}" belongs to both "${existing}" and "${category}".`);
        }
        categories.set(key, category);
      } else {
        for (const [key, child] of Object.entries(node)) {
          if (!key.startsWith("$")) {
            collect(child, [...path, key]);
          }
        }
      }
    };
    collect(JSON.parse(await readFile(join(file.parentPath, file.name), "utf8")));
  }
  return categories;
};

const buildCatalog = async (dictionary: Dictionary): Promise<DocumentationCatalog> => {
  const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
    splitResponsiveTokens(dictionary);
  const categories = new Map<string, DocumentationToken[]>();
  const sources = await sourceCategories();
  const { mappings } = buildTailwindTheme(dictionary);
  const overrides = new Map(desktopOverrides.map((token) => [
    token.path.slice(1).join("."), token,
  ]));
  const allTokens = new Map(variableTokens.map((token) => [token.path.join("."), token]));
  const breakpoint = sortedBreakpointTokens.find((token) => token.path.join(".") === "device.lg");
  if (!breakpoint) {
    throw new Error('Documentation requires a "device.lg" token.');
  }
  const desktopBreakpoint = typeof breakpoint.value === "number"
    ? `${breakpoint.value}px` : String(breakpoint.value);

  for (const token of [...sortedBreakpointTokens, ...variableTokens]) {
    const path = token.path.join(".");
    const category = sources.get(path);
    if (category === undefined) {
      continue;
    }

    if (typeof token.value !== "string" && typeof token.value !== "number") {
      throw new Error(`Unsupported documentation value for "${token.path.join(".")}".`);
    }

    const desktop = overrides.get(path);
    if (desktop && typeof desktop.value !== "string" && typeof desktop.value !== "number") {
      throw new Error(`Unsupported Desktop documentation value for "${path}".`);
    }
    const { property, unit, kind } = presentation(token, category);
    const expression = (part: TransformedToken) => {
      const value = cssVariable(part, unit);
      if (property === "filter") {
        return `blur(${value})`;
      }
      if (property === "grid-template-columns") {
        return `repeat(${value}, minmax(0, 1fr))`;
      }
      return value;
    };
    let declaration = `${property}: ${expression(token)};`;
    const preview = (part: TransformedToken, isDesktop = false) => {
      const style: Record<string, string> = {
        [property]: typeof part.value === "number" && unit
          ? `${part.value}${unit}` : String(part.value),
      };
      if (kind === "typography") {
        const prefix = token.path.slice(0, -1);
        for (const field of ["font-size", "line-height", "font-weight", "letter-spacing"]) {
          const siblingPath = [...prefix, field].join(".");
          const sibling = (isDesktop ? overrides.get(siblingPath) : undefined)
            ?? allTokens.get(siblingPath);
          if (sibling) {
            style[field] = field === "font-weight" ? fontWeight(sibling)
              : typeof sibling.value === "number" ? `${sibling.value}px` : String(sibling.value);
          }
        }
      }
      return { kind, style };
    };
    const mobilePreview = preview(token);
    const desktopPreview = desktop ? preview(desktop, true) : undefined;
    if (kind === "color") {
      mobilePreview.style = { "background-color": String(token.value) };
    }
    if (kind === "blur") {
      mobilePreview.style = { filter: `blur(${token.value}${unit})` };
    }
    if (token.path[0] === "drop-shadow") {
      const prefix = token.path.slice(0, -1);
      const parts = ["x", "y", "blur", "spread"].map((component) => {
        const part = allTokens.get([...prefix, component].join("."));
        if (!part) {
          throw new Error(`Incomplete documentation shadow "${prefix.join(".")}".`);
        }
        return part;
      });
      declaration = `box-shadow: ${parts.map((part) => cssVariable(part, "px")).join(" ")} currentColor;`;
      mobilePreview.kind = "shadow";
      mobilePreview.style = { "box-shadow": `${parts.map((part) => `${part.value}px`).join(" ")} currentColor` };
    }
    const keys = token.path.map(toCamelCase);
    const accessor = formatAccessor(keys);
    let css = `.example { ${declaration} }`;
    if (property === "--example") {
      css += "\n/* Raw token value; adapt it to the target CSS property as needed. */";
    }
    let scss = `@use "./build/scss/tokens.scss" as tokens;\n\n@include tokens.axa-tokens();\n\n${css}`;
    let js = `import { ${keys[0]} } from "./build/js/tokens.js";\n\nconst value = ${accessor};`;
    if (desktop) {
      js = `import { ${keys[0]}, media } from "./build/js/tokens.js";\n\nconst mobileValue = ${accessor}.xs;\nconst desktopValue = ${accessor}.lg;\nconst desktopQuery = media.up.lg;\n// Choose a value explicitly using your application's viewport handling.`;
    }
    if (token.path[0] === "device") {
      const viewport = token.path.at(-1);
      css = `@media (--axa-media-up-${viewport}) {\n  .example { display: block; }\n}\n/* Custom media requires a CSS custom-media processor. */`;
      scss = `@use "./build/scss/tokens.scss" as tokens;\n\n@media #{tokens.$axa-media-up-${viewport}} {\n  .example { display: block; }\n}`;
      js = `import { breakpoint, media } from "./build/js/tokens.js";\n\nconst width = breakpoint.${viewport};\nconst query = media.up.${viewport};`;
    }
    const mapping = mappings.get(path);
    let tailwind = "No generated Tailwind utility for this token. Use the CSS or JavaScript output.";
    if (mapping) {
      if (mapping.group === "screens") {
        tailwind = `<div class="${mapping.key}:block">Example</div>`;
      } else {
        const colorPrefixes: Record<string, string> = {
          "background-color": "bg", "border-color": "border",
          "outline-color": "outline", color: "text",
        };
        const prefix = mapping.group === "colors"
          ? colorPrefixes[property] : tailwindPrefixes[mapping.group];
        if (!prefix) {
          throw new Error(`No documentation utility prefix for Tailwind group "${mapping.group}".`);
        }
        tailwind = `<div class="${prefix}-${mapping.key}">Example</div>`;
        if (mapping.group === "boxShadow") {
          tailwind += "\n<!-- The utility combines this shadow's geometry tokens. -->";
        }
      }
    }
    const entries = categories.get(category) ?? [];
    entries.push({
      path,
      name: token.name,
      description: token.description,
      value: token.value,
      desktopValue: desktop?.value,
      group: token.path.slice(0, -1).join(".") || category,
      usage: { css, scss, js, tailwind },
      preview: mobilePreview,
      desktopPreview,
    });
    categories.set(category, entries);
  }

  return {
    desktopBreakpoint,
    categories: [...categories]
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([name, tokens]) => ({
        name,
        tokens: tokens.sort((first, second) => first.path.localeCompare(second.path)),
      })),
  };
};

export const storybookCatalogFormat: FormatFn = async ({ dictionary }) =>
  `${JSON.stringify(await buildCatalog(dictionary), null, 2)}\n`;

export const storybookStoriesFormat: FormatFn = async ({ dictionary }) => {
  const { categories } = await buildCatalog(dictionary);
  const identifiers = new Set<string>();
  const stories = categories.map(({ name }, index) => {
    const identifier = name.replace(/[^A-Za-z0-9]/g, "");
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(identifier) || identifiers.has(identifier)) {
      throw new Error(`Documentation category "${name}" needs a unique story identifier.`);
    }
    identifiers.add(identifier);
    return `export const ${identifier}: Story = {
  name: ${JSON.stringify(name)},
  args: { category: catalog.categories[${index}], desktopBreakpoint: catalog.desktopBreakpoint },
};`;
  });

  return `// Generated by npm run build. Do not edit.
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenDocumentation } from "../../stories/components/token-documentation/token-documentation";
import catalog from "./catalog.json";

const meta = {
  title: "Tokens",
  component: TokenDocumentation,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TokenDocumentation>;
export default meta;
type Story = StoryObj<typeof meta>;

${stories.join("\n\n")}
`;
};
