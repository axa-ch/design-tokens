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
  responsiveJsonParser,
  responsiveJsonParserName,
} from "./parsers/responsive-json";
import { css } from "./platforms/css";
import { js } from "./platforms/js";
import { scss } from "./platforms/scss";

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
    },
  },
  parsers: [responsiveJsonParserName],
  source: ["tokens/**/*.json"],
  platforms: {
    css,
    scss,
    js,
  },
  log: {
    verbosity: "verbose",
  },
} satisfies Config;

export default config;
