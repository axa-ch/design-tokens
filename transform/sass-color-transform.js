const sass = require('sass');

// assuming that the input is a 7 chars string length
const hexToRgb = (hex) => {
  if (hex.length < 7) throw new Error('Shorthand hex colors are not supported');
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
    const rgb = hexToRgb(token.value);
    const color = new sass.SassColor({ ...rgb });

    // see https://sass-lang.com/documentation/js-api/classes/SassColor#change for the available params
    return color.change(token.params).toString();
  },
};
