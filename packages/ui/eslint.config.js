// @ts-check
import { react } from '@repo/eslint-config';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...react,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add any UI-specific overrides here
      'react/prop-types': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
