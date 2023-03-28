const { filterTokenByPathName } = require('./utils');

const getEasingTokens = filterTokenByPathName('animation.easing');
const mapEasingTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace(`animation-easing-`, '')]: token.value,
    }),
    {},
  );

module.exports.getTransitionTimingFunction = (dictionary) => {
  const easing = getEasingTokens(dictionary);

  return mapEasingTokens(easing);
};
