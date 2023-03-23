const { eslint } = require('@axa-ch/myaxa-config');

module.exports = {
  extends: [eslint.base, eslint.react, eslint.typescript],
  overrides: [
    {
      files: ['vite.config.ts', '*.stories.*'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: ['*.stories.*'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};
