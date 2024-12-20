import type { FormatFn } from 'style-dictionary/types';

export const jsonTransformer: FormatFn = ({ dictionary }) => {
  return JSON.stringify(
    dictionary.allTokens.reduce(
      (acc, token) => ({
        [token.name]: {
          $value:
            // create the proper alias link to the original token name
            token.original.value?.replaceAll ? token.original.value.replaceAll('.', '-') : token.value,
          $type: token.type,
        },
        ...acc,
      }),
      {},
    ),
    null,
    2,
  );
};
