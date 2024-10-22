import './transform/index';
import { StyleDictionary } from 'style-dictionary-utils';
import { customMediaFormatter } from './formats/custom-media';
import { scssCssVarsMixinFormatter } from './formats/scss-css-vars-mixin';
import { scssMediaQueryFormatter } from './formats/scss-mq';
import { tailwindFormatter } from './formats/tailwind/index';
import { jsonTransformer } from './formats/json';
import { tailwind } from './platforms/tailwind';
import { css } from './platforms/css';
import { scss } from './platforms/scss';
import { json } from './platforms/json';
import { javascript } from './platforms/javascript';
import { scssMixin } from './platforms/scss-mixins';

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
