import { fileHeader } from "style-dictionary/utils";
import { buildResponsiveObject, formatKey } from "./responsive-object.js";

export const responsiveTypescriptFormatName =
  "typescript/responsive-object-declarations";

const formatType = (value, indentLevel = 0) => {
  if (typeof value !== "object") return typeof value;

  const indent = "  ".repeat(indentLevel + 1);
  return `{\n${Object.entries(value)
    .map(
      ([key, child]) =>
        `${indent}readonly ${formatKey(key)}: ${formatType(child, indentLevel + 1)};`,
    )
    .join("\n")}\n${"  ".repeat(indentLevel)}}`;
};

export const responsiveTypescriptFormat = async ({ dictionary, file }) => {
  const { groups, valueOf } = buildResponsiveObject(dictionary);

  return `${await fileHeader({ file })}${groups
    .map(
      ({ name, node }) =>
        `export declare const ${name}: ${formatType(valueOf(node))};`,
    )
    .join("\n\n")}\n`;
};
