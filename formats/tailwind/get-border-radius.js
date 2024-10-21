import { filterTokenByPathName } from './utils.js';

const getRadiusTokens = filterTokenByPathName('radius');
const mapRadiusTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('radius-base-', '')]: token.value,
    }),
    {},
  );

export const getBorderRadius = (dictionary) => {
  const radius = getRadiusTokens(dictionary);

  return mapRadiusTokens(radius);
};
