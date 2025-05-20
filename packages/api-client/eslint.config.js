// @ts-check
import { apiClient } from '@repo/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...apiClient,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Add any API client-specific overrides here
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.turbo/**',
      '**/*.d.ts',
      '**/*.config.js',
      '**/*.config.ts',
      'src/generated/**',
    ],
  },
];
