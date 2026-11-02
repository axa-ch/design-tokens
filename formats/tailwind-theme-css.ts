import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { buildTailwindTheme } from "./tailwind-theme";

export const tailwindThemeCssFormatName = "tailwind/theme-css";

const namespaces: Record<string, string> = {
  colors: "color",
  borderRadius: "radius",
  spacing: "spacing",
  screens: "breakpoint",
  fontSize: "text",
  lineHeight: "leading",
  fontFamily: "font",
  fontWeight: "font-weight",
  letterSpacing: "tracking",
  blur: "blur",
  borderWidth: "border-width",
  maxWidth: "container",
  boxShadow: "shadow",
};

export const tailwindThemeCssFormat: FormatFn = async ({
  dictionary,
  file,
}) => {
  const { theme, responsiveCss } = buildTailwindTheme(dictionary);

  const declarations = Object.entries(theme).flatMap(([group, entries]) => {
    const namespace = namespaces[group];

    if (!namespace) {
      throw new Error(`No Tailwind v4 namespace for theme group "${group}".`);
    }

    return Object.entries(entries).flatMap(([key, value]) => {
      const property = `--${namespace}-${key}`;
      return typeof value === "string"
        ? [`  ${property}: ${value};`]
        : [
            `  ${property}: ${value[0]};`,
            `  ${property}--line-height: ${value[1].lineHeight};`,
          ];
    });
  });

  return `${await fileHeader({ file })}@theme inline {\n${declarations.join("\n")}\n}\n\n${responsiveCss}`;
};
