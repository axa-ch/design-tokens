const { shadowCSSTransform, shadowSCSSTransform } = require('./transforms');
const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { customMediaFormatter } = require('./formats/custom-media');
const { scssMediaQuery } = require('./formats/scss-mq');

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    'css/custom-media': customMediaFormatter,
    'scss/media-query': scssMediaQuery,
  },
  transform: {
    'shadow/css': shadowCSSTransform,
    'shadow/scss': shadowSCSSTransform,
  },
  platforms: {
    css: {
      buildPath: 'build/css/',
      transforms: [...transformGroups.css, 'shadow/css'],
      files: [
        {
          destination: 'tokens.css',
          filter: (token) => token?.attributes?.category !== 'mq',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
        {
          destination: 'custom-media.css',
          format: 'css/custom-media',
          filter: (token) => token?.attributes?.category === 'mq',
        },
      ],
    },
    scss: {
      buildPath: 'build/scss/',
      transforms: [...transformGroups.scss, 'shadow/scss'],
      files: [
        {
          destination: '_tokens.scss',
          filter: (token) => token?.attributes?.category !== 'mq',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        },
        {
          destination: '_mq.scss',
          filter: (token) => token?.attributes?.category === 'mq',
          format: 'scss/media-query',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
