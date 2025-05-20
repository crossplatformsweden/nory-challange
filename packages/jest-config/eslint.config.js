// @ts-check
import { base } from '@repo/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...base,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Add any jest-config-specific overrides here
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
