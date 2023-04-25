const formattedVariables = require('style-dictionary/lib/common/formatHelpers/formattedVariables');

module.exports.scssCssVarsMixinFormatter = ({ dictionary, options, file }) => `@mixin get-${file.tokenName}-css-vars {
    ${formattedVariables({ format: 'css', dictionary, ...options })}
    }`;
