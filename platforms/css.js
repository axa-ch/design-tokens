import {
  MEDIA_QUERY_TOKEN_NAME,
  CUSTOM_CSS_TRANSFORM_LIST,
  TOKENS_LIST,
  TYPOGRAPHY_TOKEN_NAME,
  OUTPUT_BASE_DIR,
} from './constants.js';
import { outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';

export const css = {
  buildPath: `${OUTPUT_BASE_DIR}/css/`,
  transforms: [...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.css`,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'css/variables',
      options: {
        outputReferences: (token, options) =>
          outputReferencesFilter(token, options) &&
          outputReferencesTransformed(token, options) &&
          tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
    {
      destination: `${MEDIA_QUERY_TOKEN_NAME}.css`,
      format: 'css/custom-media',
      filter: (token) => token?.attributes?.category === MEDIA_QUERY_TOKEN_NAME,
    },
  ],
};
