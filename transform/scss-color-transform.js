import * as sass from 'sass';
import { hexToRgbaObject, isHexColor, rgbaStringToHexString, rgbaStringToRgbaObject } from './utils.js';

export const sassColorTransform = {
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
      (acc, [key, value]) => ({ ...acc, [key]: color[key] + value }),
      {},
    );

    try {
      // see https://sass-lang.com/documentation/js-api/classes/SassColor#change for the available params
      const output = color.change(relativeValues).toString();

      if (output.includes('rgba')) {
        // make sure that the rgba values get converted to valid hex values
        return rgbaStringToHexString(output, token.name);
      }

      return output;
    } catch (error) {
      throw new Error(`Unable to change the color ${token.name}`, { cause: error });
    }
  },
};
