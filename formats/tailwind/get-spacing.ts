import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';

const getSpacingTokens = filterTokenByPathName('spacing');
const mapSpacingTokens = (tokens: TransformedToken[]) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('spacing-base-', '')]: token.value,
    }),
    {},
  );

export const getSpacing = (dictionary: Dictionary) => {
  const spacing = getSpacingTokens(dictionary);

  return mapSpacingTokens(spacing);
};
