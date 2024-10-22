import { getFontFamily } from './get-font-family';
import { getColors } from './get-colors';
import { getFontSize } from './get-font-size';
import { getBoxShadow } from './get-box-shadow';
import { getBorderRadius } from './get-border-radius';
import { getScreens } from './get-screens';
import { getSpacing } from './get-spacing';
import { getTransitionTimingFunction } from './get-transition-timing-function';
import type { FormatFn } from 'style-dictionary/types';

const formatTokens = (tokens: unknown) => JSON.stringify(tokens);

export const tailwindFormatter: FormatFn = ({ dictionary }) =>
  `
/** @type {Omit<import('tailwindcss').Config, 'content'>} */
const config = {
    theme: {
        fontFamily: ${formatTokens(getFontFamily(dictionary))},
        fontSize: ${formatTokens(getFontSize(dictionary))},
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

export default config;
`;
