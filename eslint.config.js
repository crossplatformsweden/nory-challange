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
];
