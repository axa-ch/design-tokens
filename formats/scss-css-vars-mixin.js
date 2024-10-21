import { formattedVariables } from 'style-dictionary/utils';

export const scssCssVarsMixinFormatter = ({ dictionary, options, file }) => `@mixin get-${file.tokenName}-css-vars {
    ${formattedVariables({ format: 'css', dictionary, ...options })}
    }`;
