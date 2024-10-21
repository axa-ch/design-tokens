import { filterTokenByPathName } from './utils.js';

const getColorTokens = filterTokenByPathName('color');
const mapColorTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('color-', '')]: token.value,
    }),
    {},
  );

export const getColors = (dictionary) => {
  const colors = getColorTokens(dictionary);

  return mapColorTokens(colors);
};
