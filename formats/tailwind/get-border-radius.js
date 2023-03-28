const { filterTokenByPathName } = require('./utils');

const getRadiusTokens = filterTokenByPathName('radius');
const mapRadiusTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace(`radius-base-`, '')]: token.value,
    }),
    {},
  );

module.exports.getBorderRadius = (dictionary) => {
  const radius = getRadiusTokens(dictionary);

  return mapRadiusTokens(radius);
};
