import { filterTokenByPathName } from './utils.js';

const getEasingTokens = filterTokenByPathName('animation.easing');
const mapEasingTokens = (tokens) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('animation-easing-', '')]: token.value,
    }),
    {},
  );

export const getTransitionTimingFunction = (dictionary) => {
  const easing = getEasingTokens(dictionary);

  return mapEasingTokens(easing);
};
