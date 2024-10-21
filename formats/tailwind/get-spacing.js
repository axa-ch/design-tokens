import { filterTokenByPathName } from './utils.js';

const getSpacingTokens = filterTokenByPathName('spacing');
const mapSpacingTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('spacing-base-', '')]: token.value,
    }),
    {},
  );

export const getSpacing = (dictionary) => {
  const spacing = getSpacingTokens(dictionary);

  return mapSpacingTokens(spacing);
};
