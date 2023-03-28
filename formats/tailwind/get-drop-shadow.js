const { filterTokenByPathName } = require('./utils');

const getDropShadowTokens = filterTokenByPathName('shadow.box');
const mapDropShadowTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace(`shadow-`, '')]: token.value,
    }),
    {},
  );

module.exports.getDropShadows = (dictionary) => {
  const shadows = getDropShadowTokens(dictionary);

  return mapDropShadowTokens(shadows);
};
