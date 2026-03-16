import { transforms } from 'style-dictionary/enums';
import type { PlatformConfig } from 'style-dictionary/types';
import { MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR, shadowCssTransform, SHARED_TRANSFORM_LIST } from './constants';

export const tailwind: PlatformConfig = {
  buildPath: `${OUTPUT_BASE_DIR}/tailwind/`,
  transforms: [
    shadowCssTransform,
    transforms.cubicBezierCss,
    transforms.sizePx,
    transforms.sizePxToRem,
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.htmlIcon,
    transforms.sizeRem,
    transforms.colorCss,
    transforms.assetUrl,
    transforms.fontFamilyCss,
    // object-value tokens
    transforms.strokeStyleCssShorthand,
    transforms.borderCssShorthand,
    transforms.transitionCssShorthand,
    transforms.shadowCssShorthand,
    ...SHARED_TRANSFORM_LIST,
  ],
  files: [
    {
      destination: 'tailwind.config.js',
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'tailwind',
    },
  ],
};
