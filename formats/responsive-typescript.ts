import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { buildResponsiveObject, formatKey } from "./responsive-object";

export const responsiveTypescriptFormatName =
  "typescript/responsive-object-declarations";

const formatType = (value: unknown, indentLevel = 0): string => {
  if (typeof value !== "object" || value === null) {
    return typeof value;
  }

  const indent = "  ".repeat(indentLevel + 1);

  return `{\n${Object.entries(value as Record<string, unknown>)
    .map(
      ([key, child]) =>
        `${indent}readonly ${formatKey(key)}: ${formatType(child, indentLevel + 1)};`,
    )
    .join("\n")}\n${"  ".repeat(indentLevel)}}`;
};

export const responsiveTypescriptFormat: FormatFn = async ({
  dictionary,
  file,
}) => {
  const { groups, valueOf: resolveValue } = buildResponsiveObject(dictionary);

  return `${await fileHeader({ file })}${groups
    .map(
      ({ name, node }) =>
        `export declare const ${name}: ${formatType(resolveValue(node))};`,
    )
    .join("\n\n")}\n`;
};
