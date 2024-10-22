import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';

const getShadowTokens = filterTokenByPathName('shadow.box');
const mapShadowTokens = (tokens: TransformedToken[]) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('shadow-', '')]: token.value,
    }),
    {},
  );

export const getBoxShadow = (dictionary: Dictionary) => {
  const shadows = getShadowTokens(dictionary);

  return mapShadowTokens(shadows);
};
