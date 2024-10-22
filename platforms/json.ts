import { SHARED_TRANSFORM_LIST, MEDIA_QUERY_TOKEN_NAME } from './constants';
import type { PlatformConfig } from 'style-dictionary/types';

export const json: PlatformConfig = {
  buildPath: './',
  transforms: ['attribute/cti', 'name/kebab', 'size/px', 'color/css', 'size/px', ...SHARED_TRANSFORM_LIST],
  files: [
    {
      destination: 'tokens.json',
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'json/tokens',
    },
  ],
};
