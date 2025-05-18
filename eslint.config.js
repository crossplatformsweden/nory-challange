// @ts-check

import globals from "globals";
import { baseConfig } from "@repo/eslint-config";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];