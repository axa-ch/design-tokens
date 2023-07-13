const { shadowCss } = require('style-dictionary-utils/dist/transformer/shadow-css');
const { fontCss } = require('style-dictionary-utils/dist/transformer/font-css');
const { dimensionPixelToRem } = require('style-dictionary-utils/dist/transformer/dimension-pixel-to-rem');
const { cubicBezierCss } = require('style-dictionary-utils/dist/transformer/cubic-bezier-css');
const defaultTransforms = require('style-dictionary/lib/common/transforms');
const { sassColorTransform } = require('./scss-color-transform');
const { colorShadeTransform } = require('./color-shade-transform');

// create a matcher filtering the token type attribute
const createMatcher = (type) => (token) => token.transform === type;

// Custom transform needed for this project
module.exports = {
  'shadow/css': {
    ...shadowCss,
    matcher: createMatcher('shadow'),
  },
  'font/css': fontCss,
  'cubicBezier/css': {
    ...cubicBezierCss,
    matcher: createMatcher('cubicBezier'),
  },
  'animationDuration/css': {
    ...defaultTransforms['time/seconds'],
    matcher: createMatcher('duration'),
  },
  'size/px': {
    ...defaultTransforms['size/px'],
    matcher: createMatcher('size'),
  },
  'dimension/pixelToRem': {
    ...dimensionPixelToRem,
    matcher: createMatcher('size'),
  },
  'scss/color-transform': {
    ...sassColorTransform,
    matcher: createMatcher('color-transform'),
  },
  'color-shade-transform': {
    ...colorShadeTransform,
    matcher: createMatcher('color-shade'),
  },
};
