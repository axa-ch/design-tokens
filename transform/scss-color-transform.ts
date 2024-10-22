import * as sass from 'sass';
import { hexToRgbaObject, isHexColor, type RgbaString, rgbaStringToHexString, rgbaStringToRgbaObject } from './utils';
import type { Transform } from 'style-dictionary/types';
import { isNumber } from 'lodash-es';

export const sassColorTransform: Omit<Transform, 'name'> = {
  type: 'value',
  transitive: true,
  transform: (token) => {
    if (!token.params) throw new Error('Please provide the params key needed for the sass.color.change method');
    const rgba = isHexColor(token.value)
      ? hexToRgbaObject(token.value, token.name)
      : rgbaStringToRgbaObject(token.value, token.name);
    const color = new sass.SassColor({ red: rgba.r, green: rgba.g, blue: rgba.b, alpha: rgba.a });
    // use the values modifying the initial color properties for example:
    // given token.params.alpha - 0.2 -> we reduce the opacity of the 20%
    // color.alpha() + token.params.alpha
    const relativeValues = Object.entries(token.params).reduce(
      (acc, [key, value]) => {
        const colorValue = color[key as keyof typeof color];
        if (isNumber(colorValue) && isNumber(value)) {
          return { ...acc, [key]: colorValue + value };
        }
        return acc;
      },
      {} as { [key: string]: number },
    );

    try {
      // see https://sass-lang.com/documentation/js-api/classes/SassColor#change for the available params
      const output = color.change(relativeValues).toString();

      if (output.includes('rgba')) {
        // make sure that the rgba values get converted to valid hex values
        return rgbaStringToHexString(output as RgbaString, token.name);
      }

      return output;
    } catch (error) {
      throw new Error(`Unable to change the color ${token.name}`, { cause: error });
    }
  },
};
