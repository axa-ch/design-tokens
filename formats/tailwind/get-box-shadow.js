const { filterTokenByPathName } = require('./utils');

const getShadowTokens = filterTokenByPathName('shadow.box');
const mapShadowTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace(`shadow-`, '')]: token.value,
    }),
    {},
  );

module.exports.getBoxShadow = (dictionary) => {
  const shadows = getShadowTokens(dictionary);

  return mapShadowTokens(shadows);
};
