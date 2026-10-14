import {
  responsiveCssFormat,
  responsiveCssFormatName,
} from "./formats/responsive-css.js";
import {
  responsiveScssFormat,
  responsiveScssFormatName,
} from "./formats/responsive-scss.js";
import {
  responsiveJsonParser,
  responsiveJsonParserName,
} from "./parsers/responsive-json.js";
import { css } from "./platforms/css.js";
import { scss } from "./platforms/scss.js";

const config = {
  hooks: {
    parsers: {
      [responsiveJsonParserName]: responsiveJsonParser,
    },
    formats: {
      [responsiveCssFormatName]: responsiveCssFormat,
      [responsiveScssFormatName]: responsiveScssFormat,
    },
  },
  parsers: [responsiveJsonParserName],
  source: ["tokens/**/*.json"],
  platforms: {
    css,
    scss,
  },
  log: {
    verbosity: "verbose",
  },
};

export default config;
