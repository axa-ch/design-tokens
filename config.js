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
        const cssVariableTokens = mobileTokens.filter(
          (token) => token.path[0] !== "device",
        );
        const mobileTokensByPath = new Map(
          mobileTokens.map((token) => [token.path.join("."), token]),
        );
        const desktopOverrides = desktopTokens
          .map((token) => {
            const mobileToken = mobileTokensByPath.get(
              token.path.slice(1).join("."),
            );

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
        const lgBreakpoint = breakpointTokens.find(
          (token) => token.path.join(".") === "device.lg",
        );

        if (!lgBreakpoint) {
          throw new Error(
            'The responsive CSS format requires a "device.lg" token.',
          );
        }

        const formatProperty = createPropertyFormatter({
          outputReferences: options.outputReferences,
          dictionary,
          format: propertyFormatNames.css,
        });
        const formatTokens = (tokens) =>
          [...tokens]
            .sort(sortByReference(dictionary))
            .map(formatProperty)
            .join("\n");
        const formatBreakpointValue = (value) => {
          const unit = typeof value === "number" ? "px" : "";

          return `${value}${unit}`;
        };
        const formatCustomMedia = (token, index, tokens) => {
          const viewport = token.path.at(-1);
          const nextToken = tokens[index + 1];
          const minWidth = `(min-width: ${formatBreakpointValue(token.value)})`;
          const maxWidth = nextToken
            ? `(max-width: ${formatBreakpointValue(nextToken.value - 1)})`
            : null;
          const downQuery = maxWidth ?? "(min-width: 0px)";
          const onlyQuery = maxWidth ? `${minWidth} and ${maxWidth}` : minWidth;

          return [
            `@custom-media --axa-media-up-${viewport} ${minWidth};`,
            `@custom-media --axa-media-down-${viewport} ${downQuery};`,
            `@custom-media --axa-media-only-${viewport} ${onlyQuery};`,
          ].join("\n");
        };

        return `${await fileHeader({ file })}${sortedBreakpointTokens
          .map(formatCustomMedia)
          .join("\n")}

:root {
${formatTokens(cssVariableTokens)}
}

@media (--axa-media-up-lg) {
  :root {
${formatTokens(desktopOverrides)
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n")}
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
    // scss: {
    //   transformGroup: transformGroups.scss,
    //   prefix: "axa",
    //   buildPath: "build/scss/",
    //   files: [
    //     {
    //       destination: "tokens.scss",
    //       format: formats.scssVariables,
    //     },
    //   ],
    // },
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
