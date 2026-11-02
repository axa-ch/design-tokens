import { logVerbosityLevels } from "style-dictionary/enums";
import type { Config } from "style-dictionary/types";
import {
  responsiveCssFormat,
  responsiveCssFormatName,
} from "./formats/responsive-css";
import {
  responsiveJavascriptFormat,
  responsiveJavascriptFormatName,
} from "./formats/responsive-javascript";
import {
  responsiveScssFormat,
  responsiveScssFormatName,
} from "./formats/responsive-scss";
import {
  responsiveTypescriptFormat,
  responsiveTypescriptFormatName,
} from "./formats/responsive-typescript";
import {
  storybookCatalogFormat,
  storybookCatalogFormatName,
  storybookStoriesFormat,
  storybookStoriesFormatName,
} from "./formats/storybook";
import {
  tailwindFormat,
  tailwindFormatName,
  tailwindVariablesFormat,
  tailwindVariablesFormatName,
} from "./formats/tailwind";
import {
  tailwindThemeCssFormat,
  tailwindThemeCssFormatName,
} from "./formats/tailwind-theme-css";
import {
  responsiveJsonParser,
  responsiveJsonParserName,
} from "./parsers/responsive-json";
import { css } from "./platforms/css";
import { js } from "./platforms/js";
import { scss } from "./platforms/scss";
import { storybook } from "./platforms/storybook";
import { tailwind } from "./platforms/tailwind";
import { tailwindThemeCss } from "./platforms/tailwind-theme-css";

const config = {
  hooks: {
    parsers: {
      [responsiveJsonParserName]: responsiveJsonParser,
    },
    formats: {
      [responsiveCssFormatName]: responsiveCssFormat,
      [responsiveScssFormatName]: responsiveScssFormat,
      [responsiveJavascriptFormatName]: responsiveJavascriptFormat,
      [responsiveTypescriptFormatName]: responsiveTypescriptFormat,
      [storybookCatalogFormatName]: storybookCatalogFormat,
      [storybookStoriesFormatName]: storybookStoriesFormat,
      [tailwindFormatName]: tailwindFormat,
      [tailwindVariablesFormatName]: tailwindVariablesFormat,
      [tailwindThemeCssFormatName]: tailwindThemeCssFormat,
    },
  },
  parsers: [responsiveJsonParserName],
  source: ["tokens/**/*.json"],
  platforms: {
    css,
    scss,
    js,
    storybook,
    tailwind,
    "tailwind-theme-css": tailwindThemeCss,
  },
  log: {
    verbosity: logVerbosityLevels.verbose,
  },
} satisfies Config;

export default config;
