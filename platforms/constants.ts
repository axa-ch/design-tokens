import { transforms } from 'style-dictionary/enums';
export const MEDIA_QUERY_TOKEN_NAME = 'mq';
export const TYPOGRAPHY_TOKEN_NAME = 'typography';
// custom transforms
export const scssColorTransform = 'scss/color-transform';
export const colorShadeTransform = 'color-shade-transform';
export const shadowCssTransform = 'shadow/css';
export const animationDurationTransform = 'animationDuration/css';

export const TOKENS_LIST = [TYPOGRAPHY_TOKEN_NAME, 'color', 'shadow', 'radius', 'animation', 'spacing', 'breakpoints'];
export const SHARED_TRANSFORM_LIST = [scssColorTransform, colorShadeTransform];
export const CUSTOM_CSS_TRANSFORM_LIST = [
  // custom transforms
  shadowCssTransform,
  animationDurationTransform,
  ...SHARED_TRANSFORM_LIST,
  // native style dictionary transforms
  transforms.attributeCti,
  transforms.nameKebab,
  transforms.timeSeconds,
  transforms.htmlIcon,
  transforms.sizeRem,
  transforms.colorCss,
  transforms.assetUrl,
  transforms.fontFamilyCss,
  transforms.cubicBezierCss,
  transforms.sizePx,
  transforms.sizePxToRem,
  transforms.fontFamilyCss,
  transforms.cubicBezierCss,
  // object-value tokens
  transforms.strokeStyleCssShorthand,
  transforms.borderCssShorthand,
  transforms.typographyCssShorthand,
  transforms.transitionCssShorthand,
];
export const OUTPUT_BASE_DIR = 'build';
