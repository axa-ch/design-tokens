const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { CUSTOM_CSS_TRANSFORM_LIST, TOKENS_LIST, TYPOGRAPHY_TOKEN_NAME, OUTPUT_BASE_DIR } = require('./constants');

module.exports.scssMixin = {
  buildPath: `${OUTPUT_BASE_DIR}/scss/mixins/`,
  transforms: [...transformGroups.css, ...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.scss`,
      tokenName,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'scss/css-vars-mixin',
      options: {
        outputReferences: tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
  ],
};
