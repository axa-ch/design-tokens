export const MEDIA_QUERY_TOKEN_NAME = 'mq';
export const TYPOGRAPHY_TOKEN_NAME = 'typography';
export const TOKENS_LIST = [TYPOGRAPHY_TOKEN_NAME, 'color', 'shadow', 'radius', 'animation', 'spacing', 'breakpoints'];
export const SHARED_TRANSFORM_LIST = ['scss/color-transform', 'color-shade-transform'];
export const CUSTOM_CSS_TRANSFORM_LIST = [
  'attribute/cti',
  'name/kebab',
  'time/seconds',
  'html/icon',
  'size/rem',
  'color/css',
  'asset/url',
  'fontFamily/css',
  'cubicBezier/css',
  'shadow/css',
  'size/px',
  'dimension/pixelToRem',
  'animationDuration/css',
  'fontFamily/css',
  'fontWeight/number',
  'cubicBezier/css',
  'border/css',
  // object-value tokens
  'strokeStyle/css/shorthand',
  'border/css/shorthand',
  'typography/css/shorthand',
  'transition/css/shorthand',
  'shadow/css/shorthand',
  ...SHARED_TRANSFORM_LIST,
];
export const OUTPUT_BASE_DIR = 'build';
