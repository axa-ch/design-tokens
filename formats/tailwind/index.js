import { getFontFamily } from './get-font-family.js';
import { getColors } from './get-colors.js';
import { getFontSize } from './get-font-size.js';
import { getBoxShadow } from './get-box-shadow.js';
import { getBorderRadius } from './get-border-radius.js';
import { getScreens } from './get-screens.js';
import { getSpacing } from './get-spacing.js';
import { getTransitionTimingFunction } from './get-transition-timing-function.js';

const formatTokens = (tokens) => JSON.stringify(tokens);

export const tailwindFormatter = ({ dictionary }) =>
  `
/** @type {import('tailwindcss').Config} */
export default {
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
