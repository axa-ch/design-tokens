import { transformGroups } from "style-dictionary/enums";
import { responsiveScssFormatName } from "../formats/responsive-scss.js";

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
};
