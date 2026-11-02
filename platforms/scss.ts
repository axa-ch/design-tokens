import { transformGroups } from "style-dictionary/enums";
import type { PlatformConfig } from "style-dictionary/types";
import { responsiveScssFormatName } from "../formats/responsive-scss";

export const scss = {
  transformGroup: transformGroups.scss,
  prefix: "axa",
  buildPath: "build/scss/",
  files: [
    {
      destination: "tokens.scss",
      format: responsiveScssFormatName,
      options: {
        outputReferences: true,
      },
    },
  ],
} satisfies PlatformConfig;
