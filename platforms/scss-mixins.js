import { CUSTOM_CSS_TRANSFORM_LIST, TOKENS_LIST, TYPOGRAPHY_TOKEN_NAME, OUTPUT_BASE_DIR } from './constants.js';
import { outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';

export const scssMixin = {
  buildPath: `${OUTPUT_BASE_DIR}/scss/mixins/`,
  transforms: [...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.scss`,
      tokenName,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'scss/css-vars-mixin',

      options: {
        outputReferences: (token, options) =>
          outputReferencesFilter(token, options) &&
          outputReferencesTransformed(token, options) &&
          tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
  ],
};
