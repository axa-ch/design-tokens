import { fileHeader } from "style-dictionary/utils";
import {
  breakpointQueries,
  createResponsiveTokenFormatter,
  splitResponsiveTokens,
} from "./responsive-helpers.js";

export const responsiveScssFormatName = "scss/responsive-variables";

export const responsiveScssFormat = async ({ dictionary, options, file }) => {
  const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
    splitResponsiveTokens(dictionary);
  const formatTokens = createResponsiveTokenFormatter(dictionary, options);
  const formatMediaVariables = (...args) => {
    const { viewport, up, down, only } = breakpointQueries(...args);

    return [
      `$axa-media-up-${viewport}: "${up}";`,
      `$axa-media-down-${viewport}: "${down}";`,
      `$axa-media-only-${viewport}: "${only}";`,
    ].join("\n");
  };

  return `${await fileHeader({ file })}${sortedBreakpointTokens
    .map(formatMediaVariables)
    .join("\n")}

@mixin axa-tokens($selector: ":root") {
  #{$selector} {
${formatTokens(variableTokens, 1)}
  }

  @media #{$axa-media-up-lg} {
    #{$selector} {
${formatTokens(desktopOverrides, 2)}
    }
  }
}
`;
};
