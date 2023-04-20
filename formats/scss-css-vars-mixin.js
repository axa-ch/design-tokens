module.exports.scssCssVarsMixinFormatter = ({ dictionary, file }) => `@mixin get-${file.tokenName}-css-vars {
    ${dictionary.allTokens
      .map((prop) => {
        const { value, name } = prop;

        return `--${name}: ${value};`;
      })
      .join('\n')}
    }`;
