import { MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR, SHARED_TRANSFORM_LIST } from './constants.js';
import styleDictionary from 'style-dictionary';

export const tailwind = {
  buildPath: `${OUTPUT_BASE_DIR}/tailwind/`,
  transforms: ['shadow/css', 'cubicBezier/css', 'size/px', 'dimension/pixelToRem', ...SHARED_TRANSFORM_LIST],
  files: [
    {
      destination: 'tailwind.config.js',
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'tailwind',
    },
  ],
};
