const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { SHARED_TRANSFORM_LIST, MEDIA_QUERY_TOKEN_NAME } = require('./constants');

module.exports.json = {
  buildPath: `./`,
  transforms: [...transformGroups.web, ...SHARED_TRANSFORM_LIST],
  files: [
    {
      destination: `tokens.json`,
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'json/tokens',
    },
  ],
};
