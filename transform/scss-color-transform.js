const sass = require('sass');
const { hexToRgb } = require('./utils');

module.exports.sassColorTransform = {
  type: 'value',
  transitive: true,
  transformer: (token) => {
    if (!token.params) throw new Error('Please provide the params key needed for the sass.color.change method');
    const rgb = hexToRgb(token.value, token.name);
    const color = new sass.SassColor({ red: rgb.r, green: rgb.g, blue: rgb.b, alpha: rgb.a });
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
