import { filterTokenByPathName } from './utils.js';

const getFontFamiliesTokens = filterTokenByPathName('typography.font');

export const getFontFamily = (dictionary) => {
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
