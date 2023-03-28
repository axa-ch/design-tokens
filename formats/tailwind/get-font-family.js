const { filterTokenByPathName } = require('./utils');

const getFontFamiliesTokens = filterTokenByPathName('typography.font');

module.exports.getFontFamily = (dictionary) => {
  const fontFamilies = getFontFamiliesTokens(dictionary).reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('typography-font-family-', '')]: token.value,
    }),
    {},
  );

  return {
    primary: [fontFamilies.primary, fontFamilies['primary-fallback-1'], fontFamilies['primary-fallback-2']],
    secondary: [fontFamilies.secondary, fontFamilies['secondary-fallback-1'], fontFamilies['secondary-fallback-2']],
  };
};
