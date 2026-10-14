import { fileHeader } from "style-dictionary/utils";
import {
  breakpointQueries,
  createResponsiveTokenFormatter,
  splitResponsiveTokens,
} from "./responsive-helpers.js";

export const responsiveCssFormatName = "css/responsive-variables";

export const responsiveCssFormat = async ({ dictionary, options, file }) => {
  const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
    splitResponsiveTokens(dictionary);
  const formatTokens = createResponsiveTokenFormatter(dictionary, options);
  const formatCustomMedia = (...args) => {
    const { viewport, up, down, only } = breakpointQueries(...args);

    return [
      `@custom-media --axa-media-up-${viewport} ${up};`,
      `@custom-media --axa-media-down-${viewport} ${down};`,
      `@custom-media --axa-media-only-${viewport} ${only};`,
    ].join("\n");
  };

  return `${await fileHeader({ file })}${sortedBreakpointTokens
    .map(formatCustomMedia)
    .join("\n")}

:root {
${formatTokens(variableTokens)}
}

@media (--axa-media-up-lg) {
  :root {
${formatTokens(desktopOverrides, 1)}
  }
}
`;
};
