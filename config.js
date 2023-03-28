const transform = require('./transform');
const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { customMediaFormatter } = require('./formats/custom-media');
const { scssMediaQueryFormatter } = require('./formats/scss-mq');
const { tailwindFormatter } = require('./formats/tailwind');

const MEDIA_QUERY_TOKEN_NAME = 'mq';
const TYPOGRAPHY_TOKEN_NAME = 'typography';
const TOKENS_LIST = [TYPOGRAPHY_TOKEN_NAME, 'color', 'shadow', 'radius', 'animation', 'spacing', 'breakpoints'];
const CUSTOM_CSS_TRANSFORM_LIST = [
  'shadow/css',
  'cubicBezier/css',
  'animationDuration/css',
  'font/css',
  'size/px',
  'dimension/pixelToRem',
];

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    'css/custom-media': customMediaFormatter,
    'scss/media-query': scssMediaQueryFormatter,
    tailwind: tailwindFormatter,
  },
  transform,
  platforms: {
    tailwind: {
      buildPath: 'build/tailwind/',
      transforms: [...transformGroups.css, 'shadow/css', 'cubicBezier/css', 'size/px', 'dimension/pixelToRem'],
      files: [
        {
          destination: 'tailwind.config.js',
          filter: (token) => token?.attributes?.category !== MEDIA_QUERY_TOKEN_NAME,
          format: 'tailwind',
        },
      ],
    },
    css: {
      buildPath: 'build/css/',
      transforms: [...transformGroups.css, ...CUSTOM_CSS_TRANSFORM_LIST],
      files: [
        ...TOKENS_LIST.map((tokenName) => ({
          destination: `${tokenName}.css`,
          filter: (token) => token?.attributes?.category === tokenName,
          format: 'css/variables',
          options: {
            outputReferences: tokenName !== TYPOGRAPHY_TOKEN_NAME,
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
            outputReferences: tokenName !== TYPOGRAPHY_TOKEN_NAME,
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
