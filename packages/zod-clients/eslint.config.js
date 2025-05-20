// @ts-check
import { zod } from '@repo/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...zod,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Add any Zod-specific overrides here
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
