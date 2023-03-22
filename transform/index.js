const { shadowCss } = require('style-dictionary-utils/dist/transformer/shadow-css');
const { fontCss } = require('style-dictionary-utils/dist/transformer/font-css');
const { cubicBezierCss } = require('style-dictionary-utils/dist/transformer/cubic-bezier-css');
const defaultTransforms = require('style-dictionary/lib/common/transforms');

// create a matcher filtering the token type attribute
const createMatcher = (type) => (token) => token.type === type || token.$type === type;

// Custom transform needed for this project
module.exports = {
  'shadow/css': shadowCss,
  'font/css': fontCss,
  'cubicBezier/css': cubicBezierCss,
  'animationDuration/css': {
    ...defaultTransforms['time/seconds'],
    matcher: createMatcher('duration'),
  },
  'size/px': {
    ...defaultTransforms['size/px'],
    matcher: createMatcher('size'),
  },
};
