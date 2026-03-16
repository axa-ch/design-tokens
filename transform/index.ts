import { transforms } from 'style-dictionary/enums';
import StyleDictionary from 'style-dictionary';
import type { Transform, TransformedToken } from 'style-dictionary/types';
import { colorShadeTransform } from './color-shade-transform';
import { sassColorTransform } from './scss-color-transform';
import {
  animationDurationTransform,
  scssColorTransform,
  shadowCssTransform,
  colorShadeTransform as shadeTransform,
} from '../platforms/constants';

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
  [scssColorTransform]: {
    ...sassColorTransform,
    filter: createFilter('color-transform'),
  },
  [shadeTransform]: {
    ...colorShadeTransform,
    filter: createFilter('color-shade'),
  },
  [animationDurationTransform]: {
    ...StyleDictionary.hooks?.transforms?.[transforms.timeSeconds],
    filter: createFilter('duration'),
  },
  [shadowCssTransform]: {
    ...StyleDictionary.hooks?.transforms[transforms.shadowCssShorthand],
    filter: createFilter('shadow'),
  },
  // overwrite the default transforms of the style dictionary to use our custom filter function
  [transforms.sizePx]: {
    ...StyleDictionary.hooks?.transforms?.[transforms.sizePx],
    filter: createFilter('size'),
  },
  [transforms.sizePxToRem]: {
    ...StyleDictionary.hooks?.transforms?.[transforms.sizePxToRem],
    filter: createFilter('size'),
  },
};
