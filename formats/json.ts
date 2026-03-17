import type { FormatFn } from 'style-dictionary/types';

export const jsonTransformer: FormatFn = ({ dictionary }) => {
  return JSON.stringify(
    dictionary.allTokens.reduce(
      (acc, token) => ({
        [token.name]: {
          $value: token.value,
          $type: token.type,
          $deprecated: token.deprecatedComment,
        },
        ...acc,
      }),
      {},
    ),
    null,
    2,
  );
};
