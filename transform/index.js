import { StyleDictionary } from 'style-dictionary-utils';
import { sassColorTransform } from './scss-color-transform.js';
import { colorShadeTransform } from './color-shade-transform.js';

// create a filter filtering the token type attribute
const createFilter = (type) => (token) => token.transform === type;

StyleDictionary.registerTransform({
  name: 'scss/color-transform',
  ...sassColorTransform,
  filter: createFilter('color-transform'),
});

StyleDictionary.registerTransform({
  name: 'color-shade-transform',
  ...colorShadeTransform,
  filter: createFilter('color-shade'),
});

StyleDictionary.registerTransform({
  name: 'shadow/css',
  ...StyleDictionary.hooks.transforms['shadow/css'],
  filter: createFilter('shadow'),
});

StyleDictionary.registerTransform({
  name: 'animationDuration/css',
  ...StyleDictionary.hooks.transforms['time/seconds'],
  filter: createFilter('duration'),
});

StyleDictionary.registerTransform({
  name: 'size/px',
  ...StyleDictionary.hooks.transforms['size/px'],
  filter: createFilter('size'),
});

StyleDictionary.registerTransform({
  name: 'dimension/pixelToRem',
  ...StyleDictionary.hooks.transforms['dimension/pixelToRem'],
  filter: createFilter('size'),
});
