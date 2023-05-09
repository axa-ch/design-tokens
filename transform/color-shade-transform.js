const { normal } = require('color-blend');
const { hexToRgb, rgbToHex } = require('./utils');

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

module.exports.colorShadeTransform = {
  type: 'value',
  transitive: true,
  transformer: (token) => {
    if (!token?.shade) throw new Error('Please provide the shade param "dark|light" needed for this transformer');

    const rgb = hexToRgb(token.value, token.name);

    try {
      return rgbToHex(normal({ ...rgb, a: 1 }, token.shade === 'light' ? lightShade : darkShade));
    } catch (error) {
      throw new Error(`Unable to change the color ${token.name}`, { cause: error });
    }
  },
};
