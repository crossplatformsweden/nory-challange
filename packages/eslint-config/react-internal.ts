import { Linter } from "eslint";
import { config as baseConfig } from "./base.js";
import eslintConfigPrettier from "eslint-config-prettier";
const typescriptEslint = require("@typescript-eslint/eslint-plugin") as any;
const typescriptEslintParser = require("@typescript-eslint/parser") as any;
const eslintPluginReactHooks = require("eslint-plugin-react-hooks") as any;
const eslintPluginReact = require("eslint-plugin-react") as any;
import globals from "globals";

const pluginReact = eslintPluginReact as unknown as {
  configs: {
    flat: {
      recommended: {
        languageOptions: Linter.FlatConfig["languageOptions"];
        rules: Linter.FlatConfig["rules"];
      };
    };
  };
};

const pluginReactHooks = eslintPluginReactHooks as unknown as {
  configs: {
    recommended: {
      rules: Linter.FlatConfig["rules"];
    };
  };
};

export const config: Linter.FlatConfig[] = [
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

 
 