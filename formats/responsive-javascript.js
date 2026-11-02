import { fileHeader } from "style-dictionary/utils";
import {
  buildResponsiveObject,
  formatAccessor,
  formatKey,
} from "./responsive-object.js";

export const responsiveJavascriptFormatName = "javascript/responsive-object";

const formatNode = (node, indentLevel = 0) => {
  if (!(node instanceof Map)) {
    return "literal" in node
      ? JSON.stringify(node.literal)
      : formatAccessor(node.targetKeys);
  }

  const entries = [...node].filter(([, child]) => !child.deferred);
  if (entries.length === 0) return "{}";

  const indent = "  ".repeat(indentLevel + 1);
  return `{\n${entries
    .map(
      ([key, child]) =>
        `${indent}${formatKey(key)}: ${formatNode(child, indentLevel + 1)},`,
    )
    .join("\n")}\n${"  ".repeat(indentLevel)}}`;
};

export const responsiveJavascriptFormat = async ({ dictionary, file }) => {
  const { groups, deferred } = buildResponsiveObject(dictionary);
  const exports = groups
    .map(({ name, node }) => `export const ${name} = ${formatNode(node)};`)
    .join("\n\n");
  const assignments = deferred
    .map(
      (leaf) =>
        `${formatAccessor(leaf.keys)} = ${formatAccessor(leaf.targetKeys)};`,
    )
    .join("\n");

  return `${await fileHeader({ file })}${exports}\n${
    assignments ? `\n${assignments}\n` : ""
  }`;
};
