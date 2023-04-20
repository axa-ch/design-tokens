const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { SHARED_TRANSFORM_LIST, TOKENS_LIST, MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR } = require('./constants');

module.exports.javascript = {
  transformGroup: 'js',
  buildPath: `${OUTPUT_BASE_DIR}/js/`,
  transforms: [...transformGroups.js, ...SHARED_TRANSFORM_LIST],
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
