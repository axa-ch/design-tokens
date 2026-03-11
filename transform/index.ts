import { StyleDictionary } from 'style-dictionary-utils';
import OriginalStyleDictionary from 'style-dictionary';
import { sassColorTransform } from './scss-color-transform';
import { colorShadeTransform } from './color-shade-transform';
import type { TransformedToken, ValueTransform } from 'style-dictionary/types';

// Store the original shadow transformer in order to provide the $value (that somehow is missing while the transformation)
const formatCssShadow = StyleDictionary.hooks.transforms['shadow/css'].transform;
const formatSizeToPx = OriginalStyleDictionary.hooks?.transforms?.['size/px'].transform;
const formatPxToRem = OriginalStyleDictionary.hooks?.transforms?.['size/pxToRem'].transform;

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
  transform: (token, platform) => formatCssShadow({ ...token, $value: token.value }, platform),
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
  transform: (token, platform, config) => formatSizeToPx({ ...token, $value: token.value }, platform, config),
  filter: createFilter('size'),
} as ValueTransform);

StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  ...OriginalStyleDictionary.hooks?.transforms?.['size/pxToRem'],
  transform: (token, platform, config) => formatPxToRem({ ...token, $value: token.value }, platform, config),
  filter: createFilter('size'),
} as ValueTransform);
