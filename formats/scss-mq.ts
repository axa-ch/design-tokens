import type { FormatFn } from 'style-dictionary/types';

export const scssMediaQueryFormatter: FormatFn = ({ dictionary }) =>
  dictionary.allTokens
    .map((prop) => {
      const { value, name } = prop;

      return `$${name}: "${value}";`;
    })
    .join('\n');
