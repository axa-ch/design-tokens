module.exports.scssMediaQuery = ({ dictionary }) =>
  dictionary.allTokens
    .map((prop) => {
      const { value, name } = prop;

      return `$${name}: "${value}";`;
    })
    .join('\n');
