const sass = require('sass');

// assuming that the input is a 7 chars string length
const hexToRgb = (hex, name) => {
  if (!hex) throw new Error(`The value for ${name} is undefined`);
  if (hex.length < 7) throw new Error(`The value provided for ${name} doesn't seem to be in hex format`);
  return {
    red: parseInt(hex.slice(1, 3), 16),
    green: parseInt(hex.slice(3, 5), 16),
    blue: parseInt(hex.slice(5, 7), 16),
  };
};

module.exports.sassColorTransform = {
  type: 'value',
  transitive: true,
  transformer: (token) => {
    if (!token.params) throw new Error('Please provide the params key needed for the sass.color.change method');
    const rgb = hexToRgb(token.value, token.name);
    const color = new sass.SassColor({ ...rgb });
    // use the values modifying the initial color properties for example:
    // given token.params.alpha - 0.2 -> we reduce the opacity of the 20%
    // color.alpha() + token.params.alpha
    const relativeValues = Object.entries(token.params).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: color[key] + value }),
      {},
    );

    try {
      // see https://sass-lang.com/documentation/js-api/classes/SassColor#change for the available params
      return color.change(relativeValues).toString();
    } catch (error) {
      throw new Error(`Unable to change the color ${token.name}`, { cause: error });
    }
  },
};
