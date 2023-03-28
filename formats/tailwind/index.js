const { getFontFamily } = require('./get-font-family');
const { getColors } = require('./get-colors');
const { getFontSize } = require('./get-font-size');
const { getBoxShadow } = require('./get-box-shadow');
const { getBorderRadius } = require('./get-border-radius');
const { getScreens } = require('./get-screens');
const { getSpacing } = require('./get-spacing');
const { getTransitionTimingFunction } = require('./get-transition-timing-function');

const formatTokens = (tokens) => JSON.stringify(tokens);

module.exports.tailwindFormatter = ({ dictionary }) =>
  `
/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        fontFamily:  ${formatTokens(getFontFamily(dictionary))},
        fontSize:  ${formatTokens(getFontSize(dictionary))},
        extend: {
           screens: ${formatTokens(getScreens(dictionary))},
           spacing: ${formatTokens(getSpacing(dictionary))},
           colors: ${formatTokens(getColors(dictionary))},
           boxShadow: ${formatTokens(getBoxShadow(dictionary))},
           borderRadius: ${formatTokens(getBorderRadius(dictionary))},
           transitionTimingFunction: ${formatTokens(getTransitionTimingFunction(dictionary))},
        }
    }
}
`;
