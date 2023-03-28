const { filterTokenByPathName } = require('./utils');

const getSpacingTokens = filterTokenByPathName('spacing');
const mapSpacingTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace(`spacing-base-`, '')]: token.value,
    }),
    {},
  );

module.exports.getSpacing = (dictionary) => {
  const spacing = getSpacingTokens(dictionary);

  return mapSpacingTokens(spacing);
};
