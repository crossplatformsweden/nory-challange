import base from './base.js';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...base,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'error',
      'no-process-exit': 'off',
      'node/no-missing-import': 'off',
    },
  },
];

export default config;
