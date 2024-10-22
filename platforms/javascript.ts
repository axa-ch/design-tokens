import type { PlatformConfig } from 'style-dictionary/types';
import { SHARED_TRANSFORM_LIST, TOKENS_LIST, MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR } from './constants';

export const javascript: PlatformConfig = {
  buildPath: `${OUTPUT_BASE_DIR}/js/`,
  transforms: ['attribute/cti', 'name/pascal', 'color/hex', ...SHARED_TRANSFORM_LIST],
  files: [...TOKENS_LIST, MEDIA_QUERY_TOKEN_NAME].flatMap((tokenName) => [
    {
      destination: `${tokenName}.js`,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'javascript/es6',
    },
    {
      destination: `${tokenName}.d.ts`,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'typescript/es6-declarations',
    },
  ]),
};
