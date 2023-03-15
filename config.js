const { shadowCSSTransform, shadowSCSSTransform } = require('./transforms');
const transformGroups = require('style-dictionary/lib/common/transformGroups');
const { customMediaFormatter } = require('./formats/custom-media');
const { scssMediaQuery } = require('./formats/scss-mq');

const TOKENS_LIST = ['color', 'shadow', 'size', 'spacing', 'breakpoints'];
const MEDIA_QUERY_TOKEN_NAME = 'mq';

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
      transforms: [...transformGroups.scss, 'shadow/scss'],
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
          destination: `_${MEDIA_QUERY_TOKEN_NAME}.scss`,
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
    ts: {
      transformGroup: 'js',
      buildPath: 'build/ts/',
      files: [...TOKENS_LIST, MEDIA_QUERY_TOKEN_NAME].map((tokenName) => ({
        destination: `${tokenName}.ts`,
        filter: (token) => token?.attributes?.category === tokenName,
        format: 'typescript/es6-declarations',
      })),
    },
  },
};
