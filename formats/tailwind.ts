import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { buildTailwindTheme } from "./tailwind-theme";

export const tailwindFormatName = "tailwind/preset";
export const tailwindVariablesFormatName = "tailwind/responsive-variables";

export const tailwindFormat: FormatFn = async ({ dictionary, file }) =>
  `${await fileHeader({ file })}export default ${JSON.stringify(
    { theme: { extend: buildTailwindTheme(dictionary).theme } },
    null,
    2,
  )};\n`;

export const tailwindVariablesFormat: FormatFn = async ({ dictionary, file }) =>
  `${await fileHeader({ file })}${buildTailwindTheme(dictionary).responsiveCss}`;
