import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';

const getRadiusTokens = filterTokenByPathName('radius');
const mapRadiusTokens = (tokens: TransformedToken[]) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('radius-base-', '')]: token.value,
    }),
    {},
  );

export const getBorderRadius = (dictionary: Dictionary) => {
  const radius = getRadiusTokens(dictionary);

  return mapRadiusTokens(radius);
};
