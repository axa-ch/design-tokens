import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import {
  formats,
  propertyFormatNames,
  transformGroups,
} from "style-dictionary/enums";
import {
  createPropertyFormatter,
  fileHeader,
  sortByReference,
} from "style-dictionary/utils";

const desktopMode = "desktop-mode";
const responsiveJsonParser = "responsive-json";
const responsiveCssFormat = "css/responsive-variables";
const responsiveScssFormat = "scss/responsive-variables";

const splitResponsiveTokens = (dictionary) => {
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

const createResponsiveTokenFormatter = (dictionary, options) => {
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

// Each viewport yields an up/down/only query; "down" on the smallest and
// "only" on the largest collapse to a single bound.
const breakpointQueries = (token, index, tokens) => {
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

const config = {
  hooks: {
    parsers: {
      [responsiveJsonParser]: {
        pattern: /\.json$/,
        parser: ({ contents, filePath }) => {
          const tokens = JSON.parse(contents);
          const isPairedDesktopFile =
            filePath?.endsWith("/Desktop.json") &&
            existsSync(join(dirname(filePath), "Mobile.json"));

          return isPairedDesktopFile ? { [desktopMode]: tokens } : tokens;
        },
      },
    },
    formats: {
      [responsiveCssFormat]: async ({ dictionary, options, file }) => {
        const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
          splitResponsiveTokens(dictionary);
        const formatTokens = createResponsiveTokenFormatter(
          dictionary,
          options,
        );
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
      },
      [responsiveScssFormat]: async ({ dictionary, options, file }) => {
        const { sortedBreakpointTokens, variableTokens, desktopOverrides } =
          splitResponsiveTokens(dictionary);
        const formatTokens = createResponsiveTokenFormatter(
          dictionary,
          options,
        );
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
      },
    },
  },
  parsers: [responsiveJsonParser],
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      prefix: "axa",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: responsiveCssFormat,
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "fonts.css",
          format: formats.cssFonts,
        },
      ],
    },
    scss: {
      transformGroup: transformGroups.scss,
      prefix: "axa",
      buildPath: "build/scss/",
      files: [
        {
          destination: "tokens.scss",
          format: responsiveScssFormat,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // js: {
    //   transformGroup: transformGroups.js,
    //   prefix: "axa",
    //   buildPath: "build/js/",
    //   files: [
    //     {
    //       destination: "tokens.js",
    //       format: formats.javascriptEs6,
    //     },
    //     {
    //       destination: "tokens.d.ts",
    //       format: formats.typescriptEs6Declarations,
    //     },
    //   ],
    // },
  },
  log: {
    verbosity: "verbose",
  },
};

export default config;
