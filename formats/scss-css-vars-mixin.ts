import type { FormatFn } from 'style-dictionary/types';
import { formattedVariables } from 'style-dictionary/utils';

export const scssCssVarsMixinFormatter: FormatFn = ({ dictionary, options, file }) =>
  // biome-ignore lint/suspicious/noTsIgnore: The token name is defined but typescript doesn't recognize it
  // @ts-ignore
  `@mixin get-${file.tokenName}-css-vars {
    ${formattedVariables({ format: 'css', dictionary, ...options })}
    }`;
