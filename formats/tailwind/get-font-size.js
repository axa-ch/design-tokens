import { filterTokenByPathName } from './utils.js';

const getPrimaryFontSizesTokens = filterTokenByPathName('typography.primary');
const getSecondaryFontSizesTokens = filterTokenByPathName('typography.secondary');
const getTextFontSizesTokens = filterTokenByPathName('typography.text');

export const getFontSize = (dictionary) => {
  const primaryFontSizes = getPrimaryFontSizesTokens(dictionary);
  const secondaryFontSizes = getSecondaryFontSizesTokens(dictionary);
  const textFontSizes = getTextFontSizesTokens(dictionary);

  return [...primaryFontSizes, ...secondaryFontSizes, ...textFontSizes].reduce((acc, token) => {
    let tokenKey = token.name.replace('typography-', '');

    // Only remove the `text-` prefix for Tailwind built-ins
    // Note: In the future, we should consider replacing `text-` prefixes for other tokens as well to avoid redundancy.
    if (['text-sm', 'text-base', 'text-lg', 'text-xl'].some((utility) => token.name.includes(utility))) {
      tokenKey = tokenKey.replace('text-', '');
    }

    acc[tokenKey] = [token.value.fontSize, { lineHeight: token.value.lineHeight, fontWeight: token.value.fontWeight }];

    return acc;
  }, {});
};
