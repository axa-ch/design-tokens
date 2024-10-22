import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';

const getColorTokens = filterTokenByPathName('color');
const mapColorTokens = (tokens: TransformedToken[]) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('color-', '')]: token.value,
    }),
    {},
  );

export const getColors = (dictionary: Dictionary) => {
  const colors = getColorTokens(dictionary);

  return mapColorTokens(colors);
};
