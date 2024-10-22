import { normal } from 'color-blend/dist/index';
import { hexToRgbaObject, isHexColor, rgbObjectToHexString } from './utils';
import type { Transform } from 'style-dictionary/types';

const darkShade = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.2,
};
const lightShade = {
  r: 255,
  g: 255,
  b: 255,
  a: 0.25,
};

export const colorShadeTransform: Omit<Transform, 'name'> = {
  type: 'value',
  transitive: true,
  transform: (token) => {
    if (!token?.shade) throw new Error('Please provide the shade param "dark|light" needed for this transformer');

    const rgba = isHexColor(token.value) ? hexToRgbaObject(token.value, token.name) : token.value;

    try {
      return rgbObjectToHexString(normal(rgba, token.shade === 'light' ? lightShade : darkShade), token.name);
    } catch (error) {
      throw new Error(`Unable to change the color ${token.name}`, { cause: error });
    }
  },
};
