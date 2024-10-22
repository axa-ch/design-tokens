import type { FormatFn } from 'style-dictionary/types';

export const customMediaFormatter: FormatFn = ({ dictionary }) =>
  dictionary.allTokens
    .map((prop) => {
      const { value, name } = prop;

      return `@custom-media --${name} ${value};`;
    })
    .join('\n');
