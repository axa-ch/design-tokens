import type { FormatFn } from 'style-dictionary/types';
import { formattedVariables } from 'style-dictionary/utils';

export const scssCssVarsMixinFormatter: FormatFn = ({ dictionary, options, file }) =>
  // @ts-ignore
  `@mixin get-${file.tokenName}-css-vars {
    ${formattedVariables({ format: 'css', dictionary, ...options })}
    }`;
