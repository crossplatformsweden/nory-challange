// @ts-check

import globals from 'globals';
import { base } from '@repo/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...base,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-warning-comments': 'off',
      'no-redeclare': 'off',
      'no-console': 'off',
      'no-var-require': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
