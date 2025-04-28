import type { FormatFn } from 'style-dictionary/types';
import { formattedVariables } from 'style-dictionary/utils';
import { filterTokenByPathName } from '../tailwind/utils';
import type fontFamilyTokens from '../../tokens/globals/typography/font-family.json';
import { replaceStyleDictionaryFontSizesWithTailwindFontSizes } from './get-font-sizes';

// We don't export the spacing tokens since we use the default steps from tailwind (0.25rem)
// We also don't export animations since we don't use them currently
const getRadiusTokens = filterTokenByPathName('radius');
const getColorTokens = filterTokenByPathName('color');
const getShadowTokens = filterTokenByPathName('shadow');
const getBreakpointTokens = filterTokenByPathName('breakpoints');
const getFontSizesTokens = filterTokenByPathName('typography.font-size');
const getFontLineHeightTokens = filterTokenByPathName('typography.line-height');
const getFontFamiliesTokens = filterTokenByPathName('typography.font');

export const tailwindThemeCssFormatter: FormatFn = ({ dictionary, options }) => {
  const radiusTokensTransformed = getRadiusTokens(dictionary).map((token) => ({
    ...token,
    name: token.name.replace('base-', ''),
  }));

  const breakpointTokensTransformed = getBreakpointTokens(dictionary).map((token) => ({
    ...token,
    name: token.name.replace('breakpoints-base-', 'breakpoint-').replace('xxl', '2xl'),
    value: `${token.value}px`,
  }));

  const fontSizeTokensTransformed = getFontSizesTokens(dictionary).map((token) => ({
    ...token,
    name: replaceStyleDictionaryFontSizesWithTailwindFontSizes(
      token.name.replace('typography-font-size-', 'text-'),
      token.path[2],
    ),
  }));

  const fontLineHeightTokensTransformed = getFontLineHeightTokens(dictionary).map((token) => ({
    ...token,
    name: `${replaceStyleDictionaryFontSizesWithTailwindFontSizes(token.name.replace('typography-line-height-', 'text-'), token.path[2])}--line-height`,
  }));

  const fontFamilies = getFontFamiliesTokens(dictionary).reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('typography-font-family-', '')]: token.value,
    }),
    {},
  ) as Record<keyof (typeof fontFamilyTokens.typography)['font-family'], string>;

  return `@theme {
    --font-sans: ${[fontFamilies.primary, fontFamilies['primary-fallback-1'], fontFamilies['primary-fallback-2']]};
    --font-serif: ${[fontFamilies.secondary, fontFamilies['secondary-fallback-1'], fontFamilies['secondary-fallback-2']]};

    --font-primary: ${[fontFamilies.primary, fontFamilies['primary-fallback-1'], fontFamilies['primary-fallback-2']]};
    --font-secondary: ${[fontFamilies.secondary, fontFamilies['secondary-fallback-1'], fontFamilies['secondary-fallback-2']]};

      ${formattedVariables({
        format: 'css',
        dictionary: {
          tokens: dictionary.tokens,
          allTokens: [
            ...getColorTokens(dictionary),
            ...radiusTokensTransformed,
            ...breakpointTokensTransformed,
            ...fontSizeTokensTransformed,
            ...fontLineHeightTokensTransformed,
            ...getShadowTokens(dictionary),
          ],
        },
        ...options,
      })}
    }`;
};
