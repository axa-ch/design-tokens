// assuming that the input is a 7 chars string length
module.exports.hexToRgb = (hex, name) => {
  if (!hex) throw new Error(`The value for ${name} is undefined`);
  if (hex.length < 7) throw new Error(`The value provided for ${name} doesn't seem to be in hex format`);
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
    a: 1,
  };
};

module.exports.rgbToHex = ({ r, g, b }) => {
  const toHex = (c) => {
    const hex = c.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
