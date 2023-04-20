const transformGroups = require('style-dictionary/lib/common/transformGroups');
const {
  CUSTOM_CSS_TRANSFORM_LIST,
  TOKENS_LIST,
  TYPOGRAPHY_TOKEN_NAME,
  MEDIA_QUERY_TOKEN_NAME,
  OUTPUT_BASE_DIR,
} = require('./constants');

module.exports.scss = {
  buildPath: `${OUTPUT_BASE_DIR}/scss/`,
  transforms: [...transformGroups.scss, ...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.scss`,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'scss/variables',
      options: {
        outputReferences: tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
    {
      destination: `${MEDIA_QUERY_TOKEN_NAME}.scss`,
      filter: (token) => token?.attributes?.category === MEDIA_QUERY_TOKEN_NAME,
      format: 'scss/media-query',
    },
  ],
};
