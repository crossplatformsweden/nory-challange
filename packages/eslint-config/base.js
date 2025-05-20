import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
// Removed turbo plugin due to compatibility issues
// import turboPlugin from "eslint-plugin-turbo";
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

/**
 * A shared ESLint configuration for the repository.
 */
/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'no-console': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      'no-undef': 'error',
      // Treat all warnings as errors
      'no-warning-comments': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name="console.warn"]',
          message: 'Console warnings are not allowed. Use error instead.',
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['dist/**', 'node_modules/**', '.turbo/**'],
  },
];

export default config;
