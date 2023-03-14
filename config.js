const { shadowCSSTransform, shadowSCSSTransform } = require('./transforms');
const transformGroups = require('style-dictionary/lib/common/transformGroups');

module.exports = {
  source: ['tokens/**/*.json'],
  transform: {
    'shadow/css': shadowCSSTransform,
    'shadow/scss': shadowSCSSTransform,
  },
  platforms: {
    scss: {
      buildPath: 'build/scss/',
      transforms: [...transformGroups.scss, 'shadow/scss'],
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: {
            // Look here 👇
            outputReferences: true,
          },
        },
      ],
    },
    css: {
      buildPath: 'build/css/',
      transforms: [...transformGroups.css, 'shadow/css'],
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            // Look here 👇
            outputReferences: true,
          },
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
