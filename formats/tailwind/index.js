const { getFontFamily } = require('./get-font-family');
const { getColors } = require('./get-colors');
const { getFontSize } = require('./get-font-size');
const { getDropShadows } = require('./get-drop-shadow');
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
        extend: {
           screens: ${formatTokens(getScreens(dictionary))},
           spacing: ${formatTokens(getSpacing(dictionary))},
           colors: ${formatTokens(getColors(dictionary))},
           fontFamily:  ${formatTokens(getFontFamily(dictionary))},
           fontSize:  ${formatTokens(getFontSize(dictionary))},
           dropShadow: ${formatTokens(getDropShadows(dictionary))},
           borderRadius: ${formatTokens(getBorderRadius(dictionary))},
           transitionTimingFunction: ${formatTokens(getTransitionTimingFunction(dictionary))},
        }
    }
}
`;
