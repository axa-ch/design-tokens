import { filterTokenByPathName } from './utils.js';

const getShadowTokens = filterTokenByPathName('shadow.box');
const mapShadowTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('shadow-', '')]: token.value,
    }),
    {},
  );

export const getBoxShadow = (dictionary) => {
  const shadows = getShadowTokens(dictionary);

  return mapShadowTokens(shadows);
};
