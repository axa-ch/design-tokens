const { filterTokenByPathName } = require('./utils');

const getPrimaryFontSizesTokens = filterTokenByPathName('typography.primary');
const getSecondaryFontSizesTokens = filterTokenByPathName('typography.secondary');
const getTextFontSizesTokens = filterTokenByPathName('typography.text');

module.exports.getFontSize = (dictionary) => {
  const primaryFontSizes = getPrimaryFontSizesTokens(dictionary);
  const secondaryFontSizes = getSecondaryFontSizesTokens(dictionary);
  const textFontSizes = getTextFontSizesTokens(dictionary);

  const tailwindAliases = {
    'text-1': 'xl',
    'text-2': 'lg',
    'text-3': 'base',
    'text-4': 'sm',
  };

  const fontSizes = [...primaryFontSizes, ...secondaryFontSizes, ...textFontSizes].reduce((acc, token) => {
    const tokenKey = token.name.replace('typography-', '');

    // Assign the original text-* key for backward compatibility
    acc[tokenKey] = [token.value.fontSize, { lineHeight: token.value.lineHeight, fontWeight: token.value.fontWeight }];

    // Add tailwind alias for text-* tokens
    if (tailwindAliases[tokenKey]) {
      acc[tailwindAliases[tokenKey]] = acc[tokenKey];
    }

    return acc;
  }, {});

  return fontSizes;
};
