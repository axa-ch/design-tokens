const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { SHARED_TRANSFORM_LIST, MEDIA_QUERY_TOKEN_NAME, OUTPUT_BASE_DIR } = require('./constants');

module.exports.tailwind = {
  buildPath: `${OUTPUT_BASE_DIR}/tailwind/`,
  transforms: [
    ...transformGroups.css,
    'shadow/css',
    'cubicBezier/css',
    'size/px',
    'dimension/pixelToRem',
    ...SHARED_TRANSFORM_LIST,
  ],
  files: [
    {
      destination: 'tailwind.config.js',
      filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
      format: 'tailwind',
    },
  ],
};
