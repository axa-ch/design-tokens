import { logVerbosityLevels } from 'style-dictionary/enums';
import { StyleDictionary } from 'style-dictionary-utils';
import { customMediaFormatter } from './formats/custom-media';
import { jsonTransformer } from './formats/json';
import { scssCssVarsMixinFormatter } from './formats/scss-css-vars-mixin';
import { scssMediaQueryFormatter } from './formats/scss-mq';
import { tailwindFormatter } from './formats/tailwind/index';
import { tailwindThemeCssFormatter } from './formats/tailwind-theme-css';
import { css } from './platforms/css';
import { javascript } from './platforms/javascript';
import { json } from './platforms/json';
import { scss } from './platforms/scss';
import { scssMixin } from './platforms/scss-mixins';
import { tailwind } from './platforms/tailwind';
import { tailwindThemeCss } from './platforms/tailwind-theme-css';
import { customTransforms } from './transform/index';

const styleDictionary = new StyleDictionary({
  source: ['tokens/**/*.json'],
  hooks: {
    formats: {
      'css/custom-media': customMediaFormatter,
      'scss/media-query': scssMediaQueryFormatter,
      'scss/css-vars-mixin': scssCssVarsMixinFormatter,
      'json/tokens': jsonTransformer,
      tailwind: tailwindFormatter,
      'tailwind-theme-css': tailwindThemeCssFormatter,
    },
    transforms: customTransforms,
  },
  log: {
    verbosity: logVerbosityLevels.verbose,
  },
  platforms: {
    tailwind,
    css,
    scss,
    scssMixin,
    js: javascript,
    json,
    tailwindThemeCss: tailwindThemeCss,
  },
});

await styleDictionary.buildAllPlatforms();
