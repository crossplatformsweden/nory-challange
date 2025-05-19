import { base } from '@repo/eslint-config/index.js';

export default [
  ...base,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Add any api-client specific rules here
      'no-console': 'off', // Allow console logs during development
    },
  },
];
