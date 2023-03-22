const transform = require('./transform');
const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { customMediaFormatter } = require('./formats/custom-media');
const { scssMediaQuery } = require('./formats/scss-mq');

const TOKENS_LIST = ['typography', 'color', 'shadow', 'radius', 'animation', 'spacing', 'breakpoints'];
const MEDIA_QUERY_TOKEN_NAME = 'mq';
const CUSTOM_CSS_TRANSFORM_LIST = ['shadow/css', 'cubicBezier/css', 'animationDuration/css', 'font/css', 'size/px'];

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    'css/custom-media': customMediaFormatter,
    'scss/media-query': scssMediaQuery,
  },
  transform,
  platforms: {
    css: {
      buildPath: 'build/css/',
      transforms: [...transformGroups.css, ...CUSTOM_CSS_TRANSFORM_LIST],
      files: [
        ...TOKENS_LIST.map((tokenName) => ({
          destination: `${tokenName}.css`,
          filter: (token) => token?.attributes?.category === tokenName,
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        })),
        {
          destination: `${MEDIA_QUERY_TOKEN_NAME}.css`,
          format: 'css/custom-media',
          filter: (token) => token?.attributes?.category === MEDIA_QUERY_TOKEN_NAME,
        },
      ],
    },
    scss: {
      buildPath: 'build/scss/',
      transforms: [...transformGroups.scss, ...CUSTOM_CSS_TRANSFORM_LIST],
      files: [
        ...TOKENS_LIST.map((tokenName) => ({
          destination: `${tokenName}.scss`,
          filter: (token) => token?.attributes?.category === tokenName,
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        })),
        {
          destination: `${MEDIA_QUERY_TOKEN_NAME}.scss`,
          filter: (token) => token?.attributes?.category === MEDIA_QUERY_TOKEN_NAME,
          format: 'scss/media-query',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [...TOKENS_LIST, MEDIA_QUERY_TOKEN_NAME].flatMap((tokenName) => [
        {
          destination: `${tokenName}.js`,
          filter: (token) => token?.attributes?.category === tokenName,
          format: 'javascript/es6',
        },
        {
          destination: `${tokenName}.d.ts`,
          filter: (token) => token?.attributes?.category === tokenName,
          format: 'typescript/es6-declarations',
        },
      ]),
    },
  },
};
