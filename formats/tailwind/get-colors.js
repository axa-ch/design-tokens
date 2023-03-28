const { filterTokenByPathName } = require('./utils');

const getColorTokens = filterTokenByPathName('color');
const mapColorTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace(`color-`, '')]: token.value,
    }),
    {},
  );

module.exports.getColors = (dictionary) => {
  const colors = getColorTokens(dictionary);

  return mapColorTokens(colors);
};
