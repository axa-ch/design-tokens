import {
  CUSTOM_CSS_TRANSFORM_LIST,
  TOKENS_LIST,
  TYPOGRAPHY_TOKEN_NAME,
  MEDIA_QUERY_TOKEN_NAME,
  OUTPUT_BASE_DIR,
} from './constants.js';
import { outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';

export const scss = {
  buildPath: `${OUTPUT_BASE_DIR}/scss/`,
  transforms: [...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.scss`,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'scss/variables',
      options: {
        outputReferences: (token, options) =>
          outputReferencesFilter(token, options) &&
          outputReferencesTransformed(token, options) &&
          tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
    {
      destination: `${MEDIA_QUERY_TOKEN_NAME}.scss`,
      filter: (token) => token?.attributes?.category === MEDIA_QUERY_TOKEN_NAME,
      format: 'scss/media-query',
    },
  ],
};
