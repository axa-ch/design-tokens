const transform = require('./transform');
const { customMediaFormatter } = require('./formats/custom-media');
const { scssCssVarsMixinFormatter } = require('./formats/scss-css-vars-mixin');
const { scssMediaQueryFormatter } = require('./formats/scss-mq');
const { tailwindFormatter } = require('./formats/tailwind');
const { tailwind } = require('./platforms/tailwind');
const { css } = require('./platforms/css');
const { scss } = require('./platforms/scss');
const { javascript } = require('./platforms/javascript');
const { scssMixin } = require('./platforms/scss-mixins');

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    'css/custom-media': customMediaFormatter,
    'scss/media-query': scssMediaQueryFormatter,
    'scss/css-vars-mixin': scssCssVarsMixinFormatter,
    tailwind: tailwindFormatter,
  },
  transform,
  platforms: {
    tailwind,
    css,
    scss,
    scssMixin,
    js: javascript,
  },
};
