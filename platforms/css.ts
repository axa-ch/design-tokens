import { formats, transformGroups } from "style-dictionary/enums";
import type { PlatformConfig } from "style-dictionary/types";
import { responsiveCssFormatName } from "../formats/responsive-css";

export const css = {
  transformGroup: transformGroups.css,
  prefix: "axa",
  buildPath: "build/css/",
  files: [
    {
      destination: "tokens.css",
      format: responsiveCssFormatName,
      options: {
        outputReferences: true,
      },
    },
    {
      destination: "fonts.css",
      format: formats.cssFonts,
    },
  ],
} satisfies PlatformConfig;
