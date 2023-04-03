const { eslint } = require('@axa-ch/myaxa-config');

module.exports = {
  extends: [eslint.base, eslint.react, eslint.typescript],
  rules: {
    'import/no-extraneous-dependencies': 0,
  },
  overrides: [
    {
      files: ['*.stories.*'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};
