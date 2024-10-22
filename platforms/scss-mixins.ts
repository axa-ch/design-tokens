import type { LocalOptions, PlatformConfig, TransformedToken } from 'style-dictionary/types';
import { CUSTOM_CSS_TRANSFORM_LIST, TOKENS_LIST, TYPOGRAPHY_TOKEN_NAME, OUTPUT_BASE_DIR } from './constants';
import { outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';

export const scssMixin: PlatformConfig = {
  buildPath: `${OUTPUT_BASE_DIR}/scss/mixins/`,
  transforms: [...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.scss`,
      tokenName,
      filter: (token: TransformedToken) => token?.attributes?.category === tokenName,
      format: 'scss/css-vars-mixin',

      options: {
        outputReferences: (token: TransformedToken, options: LocalOptions) =>
          outputReferencesFilter(token, options) &&
          outputReferencesTransformed(token, options) &&
          tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
  ],
};
