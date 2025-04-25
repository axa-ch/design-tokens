import type { PlatformConfig } from 'style-dictionary/types';
import { CUSTOM_CSS_TRANSFORM_LIST, MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR } from './constants';

export const tailwindv4: PlatformConfig = {
  buildPath: `${OUTPUT_BASE_DIR}/tailwind/`,
  transforms: CUSTOM_CSS_TRANSFORM_LIST,
  files: [
    {
      destination: 'tailwind-theme.css',
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'tailwindv4',
    },
  ],
};
