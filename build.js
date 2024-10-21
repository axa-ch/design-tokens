import './transform/index.js';
import { StyleDictionary } from 'style-dictionary-utils';
import { customMediaFormatter } from './formats/custom-media.js';
import { scssCssVarsMixinFormatter } from './formats/scss-css-vars-mixin.js';
import { scssMediaQueryFormatter } from './formats/scss-mq.js';
import { tailwindFormatter } from './formats/tailwind/index.js';
import { jsonTransformer } from './formats/json.js';
import { tailwind } from './platforms/tailwind.js';
import { css } from './platforms/css.js';
import { scss } from './platforms/scss.js';
import { json } from './platforms/json.js';
import { javascript } from './platforms/javascript.js';
import { scssMixin } from './platforms/scss-mixins.js';

const styleDictionary = new StyleDictionary({
  source: ['tokens/**/*.json'],
  hooks: {
    formats: {
      'css/custom-media': customMediaFormatter,
      'scss/media-query': scssMediaQueryFormatter,
      'scss/css-vars-mixin': scssCssVarsMixinFormatter,
      'json/tokens': jsonTransformer,
      tailwind: tailwindFormatter,
    },
  },
  platforms: {
    tailwind,
    css,
    scss,
    scssMixin,
    js: javascript,
    json,
  },
});

await styleDictionary.buildAllPlatforms();
