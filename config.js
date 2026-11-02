import {
  responsiveCssFormat,
  responsiveCssFormatName,
} from "./formats/responsive-css.js";
import {
  responsiveJavascriptFormat,
  responsiveJavascriptFormatName,
} from "./formats/responsive-javascript.js";
import {
  responsiveScssFormat,
  responsiveScssFormatName,
} from "./formats/responsive-scss.js";
import {
  responsiveTypescriptFormat,
  responsiveTypescriptFormatName,
} from "./formats/responsive-typescript.js";
import {
  responsiveJsonParser,
  responsiveJsonParserName,
} from "./parsers/responsive-json.js";
import { css } from "./platforms/css.js";
import { js } from "./platforms/js.js";
import { scss } from "./platforms/scss.js";

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
};

export default config;
