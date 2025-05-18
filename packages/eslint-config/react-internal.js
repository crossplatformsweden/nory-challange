import baseConfig from "./base.js";
import eslintConfigPrettier from "eslint-config-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReact from "eslint-plugin-react";
import globals from "globals";

const pluginReact = eslintPluginReact;
const pluginReactHooks = eslintPluginReactHooks;

export const config = [
  ...baseConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "react-hooks": eslintPluginReactHooks,
      react: eslintPluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...(typescriptEslint.configs.recommended?.rules ?? {}),
      ...(pluginReact.configs.flat.recommended.rules ?? {}),
      ...(pluginReactHooks.configs.recommended.rules ?? {}),
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  eslintConfigPrettier,
];
