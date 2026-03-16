import { StyleDictionary } from 'style-dictionary-utils';
import { transforms } from 'style-dictionary/enums';
import OriginalStyleDictionary from 'style-dictionary';
import { sassColorTransform } from './scss-color-transform';
import { colorShadeTransform } from './color-shade-transform';
import type { TransformedToken, ValueTransform } from 'style-dictionary/types';

// create a filter filtering the token type attribute
const createFilter = (type: string) => (token: TransformedToken) => token.transform === type;

StyleDictionary.registerTransform({
  name: 'scss/color-transform',
  ...sassColorTransform,
  filter: createFilter('color-transform'),
} as ValueTransform);

StyleDictionary.registerTransform({
  name: 'color-shade-transform',
  ...colorShadeTransform,
  filter: createFilter('color-shade'),
} as ValueTransform);

StyleDictionary.registerTransform({
  name: 'shadow/css',
  ...StyleDictionary.hooks?.transforms?.['shadow/css'],
  filter: createFilter('shadow'),
} as ValueTransform);

StyleDictionary.registerTransform({
  name: 'animationDuration/css',
  ...StyleDictionary.hooks?.transforms?.['time/seconds'],
  filter: createFilter('duration'),
} as ValueTransform);

StyleDictionary.registerTransform({
  name: 'size/px',
  ...OriginalStyleDictionary.hooks?.transforms?.['size/px'],
  filter: createFilter('size'),
} as ValueTransform);

StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  ...OriginalStyleDictionary.hooks?.transforms?.['size/pxToRem'],
  filter: createFilter('size'),
} as ValueTransform);
