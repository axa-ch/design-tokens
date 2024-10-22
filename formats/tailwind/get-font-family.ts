import type { Dictionary } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';
import type fontFamilyTokens from '../../tokens/globals/typography/font-family.json';

const getFontFamiliesTokens = filterTokenByPathName('typography.font');

export const getFontFamily = (dictionary: Dictionary) => {
  const fontFamilies = getFontFamiliesTokens(dictionary).reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('typography-font-family-', '')]: token.value,
    }),
    {},
  ) as Record<keyof (typeof fontFamilyTokens.typography)['font-family'], string>;

  return {
    primary: [fontFamilies.primary, fontFamilies['primary-fallback-1'], fontFamilies['primary-fallback-2']],
    secondary: [fontFamilies.secondary, fontFamilies['secondary-fallback-1'], fontFamilies['secondary-fallback-2']],
  };
};
