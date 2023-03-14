module.exports.customMediaFormatter = ({ dictionary }) =>
  dictionary.allTokens
    .map((prop) => {
      const { value, name } = prop;

      return `@custom-media --${name} ${value};`;
    })
    .join('\n');
