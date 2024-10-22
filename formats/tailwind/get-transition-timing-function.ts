import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';

const getEasingTokens = filterTokenByPathName('animation.easing');
const mapEasingTokens = (tokens: TransformedToken[]) =>
  tokens.reduce(
    (acc, token) => ({
      ...acc,
      [token.name.replace('animation-easing-', '')]: token.value,
    }),
    {},
  );

export const getTransitionTimingFunction = (dictionary: Dictionary) => {
  const easing = getEasingTokens(dictionary);

  return mapEasingTokens(easing);
};
