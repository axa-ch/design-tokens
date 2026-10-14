import { isDeepStrictEqual } from "node:util";
import { propertyFormatNames } from "style-dictionary/enums";
import {
  createPropertyFormatter,
  sortByReference,
} from "style-dictionary/utils";

const desktopMode = "desktop-mode";

export const splitResponsiveTokens = (dictionary) => {
  const desktopTokens = dictionary.allTokens.filter(
    (token) => token.path[0] === desktopMode,
  );
  const mobileTokens = dictionary.allTokens.filter(
    (token) => token.path[0] !== desktopMode,
  );
  const breakpointTokens = mobileTokens.filter(
    (token) => token.path[0] === "device",
  );
  const sortedBreakpointTokens = [...breakpointTokens].sort(
    (first, second) => first.value - second.value,
  );
  const variableTokens = mobileTokens.filter(
    (token) => token.path[0] !== "device",
  );
  const mobileTokensByPath = new Map(
    mobileTokens.map((token) => [token.path.join("."), token]),
  );
  const desktopOverrides = desktopTokens
    .map((token) => {
      const mobileToken = mobileTokensByPath.get(token.path.slice(1).join("."));

      if (!mobileToken) {
        throw new Error(
          `Desktop token "${token.path.slice(1).join(".")}" has no Mobile counterpart.`,
        );
      }

      return isDeepStrictEqual(token.value, mobileToken.value)
        ? null
        : { ...token, name: mobileToken.name };
    })
    .filter(Boolean);

  if (!breakpointTokens.some((token) => token.path.join(".") === "device.lg")) {
    throw new Error('The responsive formats require a "device.lg" token.');
  }

  return { sortedBreakpointTokens, variableTokens, desktopOverrides };
};

export const createResponsiveTokenFormatter = (dictionary, options) => {
  const formatProperty = createPropertyFormatter({
    outputReferences: options.outputReferences,
    dictionary,
    format: propertyFormatNames.css,
  });

  return (tokens, indentLevel = 0) =>
    [...tokens]
      .sort(sortByReference(dictionary))
      .map(formatProperty)
      .map((line) => `${"  ".repeat(indentLevel)}${line}`)
      .join("\n");
};

const formatBreakpointValue = (value) =>
  `${value}${typeof value === "number" ? "px" : ""}`;

export const breakpointQueries = (token, index, tokens) => {
  const nextToken = tokens[index + 1];
  const minWidth = `(min-width: ${formatBreakpointValue(token.value)})`;
  const maxWidth = nextToken
    ? `(max-width: ${formatBreakpointValue(nextToken.value - 1)})`
    : null;

  return {
    viewport: token.path.at(-1),
    up: minWidth,
    down: maxWidth ?? "(min-width: 0px)",
    only: maxWidth ? `${minWidth} and ${maxWidth}` : minWidth,
  };
};
