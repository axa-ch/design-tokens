const { filterTokenByPathName } = require('./utils');

const getPrimaryFontSizesTokens = filterTokenByPathName('typography.primary');
const getSecondaryFontSizesTokens = filterTokenByPathName('typography.secondary');
const getTextFontSizesTokens = filterTokenByPathName('typography.text');

module.exports.getFontSize = (dictionary) => {
  const primaryFontSizes = getPrimaryFontSizesTokens(dictionary);
  const secondaryFontSizes = getSecondaryFontSizesTokens(dictionary);
  const textFontSizes = getTextFontSizesTokens(dictionary);

  return [...primaryFontSizes, ...secondaryFontSizes, ...textFontSizes].reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('typography-', '')]: [
        token.value.fontSize,
        { lineHeight: token.value.lineHeight, fontWeight: token.value.fontWeight },
      ],
    }),
    {},
  );
};
