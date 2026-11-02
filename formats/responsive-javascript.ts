import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import {
  buildResponsiveObject,
  formatAccessor,
  formatKey,
} from "./responsive-object";

export const responsiveJavascriptFormatName = "javascript/responsive-object";

type ResponsiveNode = ReturnType<
  typeof buildResponsiveObject
>["groups"][number]["node"];

const formatNode = (node: ResponsiveNode, indentLevel = 0): string => {
  if (!(node instanceof Map)) {
    return "literal" in node
      ? (JSON.stringify(node.literal) ?? "undefined")
      : formatAccessor(node.targetKeys!);
  }

  const entries = [...node].filter(([, child]) => {
    if (child instanceof Map) {
      return true;
    }

    return !("deferred" in child && child.deferred);
  });

  if (entries.length === 0) {
    return "{}";
  }

  const indent = "  ".repeat(indentLevel + 1);

  return `{\n${entries
    .map(
      ([key, child]) =>
        `${indent}${formatKey(key)}: ${formatNode(child, indentLevel + 1)},`,
    )
    .join("\n")}\n${"  ".repeat(indentLevel)}}`;
};

export const responsiveJavascriptFormat: FormatFn = async ({
  dictionary,
  file,
}) => {
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
