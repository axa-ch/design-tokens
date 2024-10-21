import { MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR, SHARED_TRANSFORM_LIST } from './constants.js';

export const tailwind = {
  buildPath: `${OUTPUT_BASE_DIR}/tailwind/`,
  transforms: [
    'shadow/css',
    'cubicBezier/css',
    'size/px',
    'dimension/pixelToRem',
    'attribute/cti',
    'name/kebab',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/css',
    'asset/url',
    'fontFamily/css',
    'cubicBezier/css',
    // object-value tokens
    'strokeStyle/css/shorthand',
    'border/css/shorthand',
    'transition/css/shorthand',
    'shadow/css/shorthand',
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
