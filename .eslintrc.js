const { eslint } = require('@axa-ch/easy-config');

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
