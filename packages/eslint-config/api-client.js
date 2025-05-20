import base from './base.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...base,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default config;
