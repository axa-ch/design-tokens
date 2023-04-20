const transformGroups = require('style-dictionary/lib/common/transformGroups');
const {
  MEDIA_QUERY_TOKEN_NAME,
  CUSTOM_CSS_TRANSFORM_LIST,
  TOKENS_LIST,
  TYPOGRAPHY_TOKEN_NAME,
  OUTPUT_BASE_DIR,
} = require('./constants');

module.exports.css = {
  buildPath: `${OUTPUT_BASE_DIR}/css/`,
  transforms: [...transformGroups.css, ...CUSTOM_CSS_TRANSFORM_LIST],
  files: [
    ...TOKENS_LIST.map((tokenName) => ({
      destination: `${tokenName}.css`,
      filter: (token) => token?.attributes?.category === tokenName,
      format: 'css/variables',
      options: {
        outputReferences: tokenName !== TYPOGRAPHY_TOKEN_NAME,
      },
    })),
    {
      destination: `${MEDIA_QUERY_TOKEN_NAME}.css`,
      format: 'css/custom-media',
      filter: (token) => token?.attributes?.category === MEDIA_QUERY_TOKEN_NAME,
    },
  ],
};
