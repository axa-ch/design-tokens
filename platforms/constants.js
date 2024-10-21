import styleDictionary from 'style-dictionary';
export const MEDIA_QUERY_TOKEN_NAME = 'mq';
export const TYPOGRAPHY_TOKEN_NAME = 'typography';
export const TOKENS_LIST = [TYPOGRAPHY_TOKEN_NAME, 'color', 'shadow', 'radius', 'animation', 'spacing', 'breakpoints'];
export const SHARED_TRANSFORM_LIST = ['scss/color-transform', 'color-shade-transform'];
export const CUSTOM_CSS_TRANSFORM_LIST = [
  ...styleDictionary.hooks.transformGroups.css,
  'shadow/css',
  'size/px',
  'dimension/pixelToRem',
  'animationDuration/css',
  'fontFamily/css',
  'fontWeight/number',
  'cubicBezier/css',
  'border/css',
  ...SHARED_TRANSFORM_LIST,
];
export const OUTPUT_BASE_DIR = 'build';
