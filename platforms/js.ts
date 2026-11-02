import { transforms } from "style-dictionary/enums";
import type { PlatformConfig } from "style-dictionary/types";
import { responsiveJavascriptFormatName } from "../formats/responsive-javascript";
import { responsiveTypescriptFormatName } from "../formats/responsive-typescript";

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
} satisfies PlatformConfig;
