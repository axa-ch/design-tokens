import type { Dictionary, TransformedToken } from "style-dictionary/types";
import { splitResponsiveTokens } from "./responsive-helpers";

type FontSize = [string, { lineHeight: string }];
type TailwindValue = string | FontSize;

const dimension = (token: TransformedToken, unit = "px"): string => {
  if (typeof token.value !== "number" && typeof token.value !== "string") {
    throw new Error(
      `Tailwind dimension "${token.path.join(".")}" must be a number or string.`,
    );
  }

  return typeof token.value === "number"
    ? `${token.value}${unit}`
    : token.value;
};

export const fontWeight = (token: TransformedToken): string => {
  const weights: Record<string, string> = {
    thin: "100",
    extralight: "200",
    light: "300",
    regular: "400",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  };
  const value = String(token.value);
  const weight = weights[value.toLowerCase().replace(/[\s-]/g, "")] ?? value;

  if (!/^[1-9]\d{0,2}$|^1000$/.test(weight)) {
    throw new Error(`Unsupported Tailwind font weight "${value}".`);
  }

  return weight;
};

export const buildTailwindTheme = (dictionary: Dictionary) => {
  const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
    splitResponsiveTokens(dictionary);

  const theme: Record<string, Record<string, TailwindValue>> = {
    colors: {},
    borderRadius: {},
    spacing: {},
    screens: {},
    fontSize: {},
    lineHeight: {},
    fontFamily: {},
    fontWeight: {},
    letterSpacing: {},
    blur: {},
    borderWidth: {},
    maxWidth: {},
    boxShadow: {},
  };
  const mappings = new Map<string, { group: string; key: string }>();
  const set = (
    token: TransformedToken,
    group: string,
    key: string,
    value: TailwindValue,
  ) => {
    theme[group][key] = value;
    mappings.set(token.path.join("."), { group, key });
  };
  const tokensByPath = new Map(
    variableTokens.map((token) => [token.path.join("."), token]),
  );
  const responsiveNames = new Set(desktopOverrides.map((token) => token.name));
  const variableName = (token: TransformedToken) =>
    `--axa-tailwind-${token.name}`;
  const responsiveFormatters = new Map<
    string,
    (token: TransformedToken) => string
  >();

  const responsiveValue = (
    token: TransformedToken,
    format = dimension,
  ): string => {
    responsiveFormatters.set(token.name, format);
    return responsiveNames.has(token.name)
      ? `var(${variableName(token)})`
      : format(token);
  };

  for (const token of sortedBreakpointTokens) {
    set(token, "screens", token.path.slice(1).join("-"), dimension(token));
  }

  for (const token of variableTokens) {
    const [root, ...path] = token.path;
    const key = path.join("-");

    if (token.type === "color") {
      set(token, "colors", token.name, token.value);
    } else if (root === "radius") {
      set(token, "borderRadius", key, dimension(token, key === "circle" ? "%" : "px"));
    } else if (["dimension", "gap", "padding"].includes(root)) {
      set(token, "spacing", token.name, dimension(token));
    } else if (token.path.at(-1) === "font-size") {
      const lineHeight = tokensByPath.get(
        [...token.path.slice(0, -1), "line-height"].join("."),
      );
      if (!lineHeight) {
        throw new Error(
          `Tailwind font size "${token.path.join(".")}" has no line-height token.`,
        );
      }

      set(token, "fontSize", token.name.replace(/-font-size$/, ""), [
        responsiveValue(token),
        { lineHeight: responsiveValue(lineHeight) },
      ]);
    } else if (root === "fontSize") {
      set(token, "fontSize", key, responsiveValue(token));
    } else if (root === "lineHeight" || token.path.at(-1) === "line-height") {
      set(
        token, "lineHeight",
        root === "lineHeight" ? key : token.name.replace(/-line-height$/, ""),
        responsiveValue(token),
      );
    } else if (root === "font-family" || token.name.endsWith("-font-family")) {
      set(
        token, "fontFamily",
        token.name.replace(/^font-family-/, "").replace(/-font-family$/, ""),
        responsiveValue(token, (family) => String(family.value)),
      );
    } else if (root === "fontWeights" || token.path.at(-1) === "font-weight") {
      set(
        token, "fontWeight",
        token.name.replace(/^font-weights-/, "").replace(/-font-weight$/, ""),
        responsiveValue(token, fontWeight),
      );
    } else if (
      root === "letterSpacing" ||
      token.path.at(-1) === "letter-spacing"
    ) {
      set(
        token, "letterSpacing",
        token.name
          .replace(/^letter-spacing-/, "")
          .replace(/-letter-spacing$/, ""),
        responsiveValue(token),
      );
    } else if (root === "blur" && path[0] === "size") {
      set(token, "blur", path.slice(1).join("-"), dimension(token));
    } else if (root === "stroke" && path[0] === "width") {
      set(token, "borderWidth", path.slice(1).join("-"), dimension(token));
    } else if (root === "container" && path[0] === "size") {
      set(token, "maxWidth", path.slice(1).join("-"), dimension(token));
    } else if (root === "drop-shadow" && path.at(-1) === "x") {
      const shadowPath = token.path.slice(0, -1);
      const components = ["x", "y", "blur", "spread"].map((component) => {
        const part = tokensByPath.get([...shadowPath, component].join("."));
        if (!part) {
          throw new Error(
            `Tailwind shadow "${shadowPath.join(".")}" has no "${component}" token.`,
          );
        }

        return dimension(part);
      });
      const color = tokensByPath.get([...shadowPath, "color"].join("."));
      if (color) {
        components.push(String(color.value));
      }

      const key = path.slice(0, -1).join("-");
      set(token, "boxShadow", key, components.join(" "));
      for (const component of ["y", "blur", "spread"]) {
        mappings.set([...shadowPath, component].join("."), { group: "boxShadow", key });
      }
    }
  }

  const responsiveTokens = variableTokens.filter(
    (token) =>
      responsiveNames.has(token.name) && responsiveFormatters.has(token.name),
  );
  const usedOverrides = desktopOverrides.filter((token) =>
    responsiveFormatters.has(token.name),
  );
  const declarations = (tokens: TransformedToken[], indent: string) =>
    tokens
      .map((token) => {
        const format = responsiveFormatters.get(token.name);
        if (!format) {
          throw new Error(`No responsive formatter for "${token.name}".`);
        }

        return `${indent}${variableName(token)}: ${format(token)};`;
      })
      .join("\n");
  const desktopBreakpoint = theme.screens.lg;
  const responsiveCss = usedOverrides.length
    ? `:root {\n${declarations(responsiveTokens, "  ")}\n}\n\n@media (min-width: ${desktopBreakpoint}) {\n  :root {\n${declarations(usedOverrides, "    ")}\n  }\n}\n`
    : "";

  return { theme, responsiveCss, mappings };
};
