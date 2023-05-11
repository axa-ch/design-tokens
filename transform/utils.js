const { isUndefined } = require('lodash');

// hex string into rgba object
const hexToRgbaObject = (hex, name) => {
  if (isUndefined(hex)) throw new Error(`The value for ${name} is undefined`);
  if (hex.length < 7) throw new Error(`The value provided for ${name} doesn't seem to be in hex format`);

  try {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
      a: 1,
    };
  } catch (error) {
    throw new Error(`The value for ${name} couldn't be properly converted into RGBA object`, { cause: error });
  }
};

// private helper to convert a value into hex
const toHex = (c) => {
  const hex = c.toString(16);
  return hex.padStart(2, '0');
};

// Convert a rgb object into a hex string
const rgbObjectToHexString = ({ r, g, b }, name) => {
  try {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch (error) {
    throw new Error(`The value for ${name} couldn't be properly converted into hex string`, { cause: error });
  }
};

// borrowed from https://codepen.io/splintmi/pen/zwOLpO
// converting the alpha channel assuming that the background is white
const rgbaStringToHexString = (color, name) => {
  const channels = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
  const r = Math.round(channels[1] * channels[4] + 255 * (1 - channels[4]));
  const g = Math.round(channels[2] * channels[4] + 255 * (1 - channels[4]));
  const b = Math.round(channels[3] * channels[4] + 255 * (1 - channels[4]));

  if (!channels || channels.length !== 5) {
    throw new Error(`The value for ${name} doesn't seem to be an rgba string`);
  }
  return rgbObjectToHexString({ r, g, b }, name);
};

module.exports = {
  rgbObjectToHexString,
  hexToRgbaObject,
  toHex,
  rgbaStringToHexString,
};
