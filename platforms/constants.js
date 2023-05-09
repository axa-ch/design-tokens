const MEDIA_QUERY_TOKEN_NAME = 'mq';
const TYPOGRAPHY_TOKEN_NAME = 'typography';
const TOKENS_LIST = [TYPOGRAPHY_TOKEN_NAME, 'color', 'shadow', 'radius', 'animation', 'spacing', 'breakpoints'];
const SHARED_TRANSFORM_LIST = ['scss/color-transform', 'color-shade-transform'];
const CUSTOM_CSS_TRANSFORM_LIST = [
  'shadow/css',
  'cubicBezier/css',
  'animationDuration/css',
  'font/css',
  'size/px',
  'dimension/pixelToRem',
  ...SHARED_TRANSFORM_LIST,
];
const OUTPUT_BASE_DIR = 'build';

module.exports.MEDIA_QUERY_TOKEN_NAME = MEDIA_QUERY_TOKEN_NAME;
module.exports.TYPOGRAPHY_TOKEN_NAME = TYPOGRAPHY_TOKEN_NAME;
module.exports.TOKENS_LIST = TOKENS_LIST;
module.exports.SHARED_TRANSFORM_LIST = SHARED_TRANSFORM_LIST;
module.exports.CUSTOM_CSS_TRANSFORM_LIST = CUSTOM_CSS_TRANSFORM_LIST;
module.exports.OUTPUT_BASE_DIR = OUTPUT_BASE_DIR;
