// @ts-check
import { node } from '@repo/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...node,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Add any backend-specific overrides here
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },
];
