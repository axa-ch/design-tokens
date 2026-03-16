import OriginalStyleDictionary from 'style-dictionary';
import type { Transform, TransformedToken } from 'style-dictionary/types';
import { colorShadeTransform } from './color-shade-transform';
import { sassColorTransform } from './scss-color-transform';

type TransformWithoutName = Omit<Transform, 'name'>;

// create a filter filtering the token "transform" attribute
const createFilter = (type: string) => (token: TransformedToken) => token.transform === type;

/**
 * Custom transforms to be passed via hooks.transforms in the StyleDictionary config.
 *
 * Using `registerTransform` with the same name as a built-in transform does not
 * propagate to StyleDictionary instances (the instance copies the originals at
 * construction time). Passing them through `hooks.transforms` in the config
 * ensures the instance picks up the overrides.
 *
 */
export const customTransforms: Record<string, TransformWithoutName> = {
  'scss/color-transform': {
    ...sassColorTransform,
    filter: createFilter('color-transform'),
  },

  'color-shade-transform': {
    ...colorShadeTransform,
    filter: createFilter('color-shade'),
  },

  'shadow/css': {
    ...OriginalStyleDictionary.hooks?.transforms['shadow/css/shorthand'],
    filter: createFilter('shadow'),
  },

  'animationDuration/css': {
    ...OriginalStyleDictionary.hooks?.transforms?.['time/seconds'],
    filter: createFilter('duration'),
  },

  'size/px': {
    ...OriginalStyleDictionary.hooks?.transforms?.['size/px'],
    filter: createFilter('size'),
  },

  'size/pxToRem': {
    ...OriginalStyleDictionary.hooks?.transforms?.['size/pxToRem'],
    filter: createFilter('size'),
  },
};
