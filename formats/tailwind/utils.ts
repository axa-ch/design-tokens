import type { Dictionary, TransformedToken } from 'style-dictionary/types';

export const filterTokenByPathName: (type: string) => (dictionary: Dictionary) => TransformedToken[] =
  (type) =>
  ({ allTokens }) =>
    allTokens.filter((token) => token.path.join('.').includes(type));
