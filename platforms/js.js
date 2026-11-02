import { transforms } from "style-dictionary/enums";
import { responsiveJavascriptFormatName } from "../formats/responsive-javascript.js";
import { responsiveTypescriptFormatName } from "../formats/responsive-typescript.js";

export const js = {
  transforms: [
    transforms.attributeCti,
    transforms.nameCamel,
    transforms.colorCss,
  ],
  buildPath: "build/js/",
  files: [
    {
      destination: "tokens.js",
      format: responsiveJavascriptFormatName,
    },
    {
      destination: "tokens.d.ts",
      format: responsiveTypescriptFormatName,
    },
  ],
};
