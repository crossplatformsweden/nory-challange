import { Linter } from "eslint";
import { config as baseConfig } from "./base.js";
import eslintConfigPrettier from "eslint-config-prettier";
const nextPlugin = require("@next/eslint-plugin-next");

/**
 * A custom ESLint configuration for libraries that use Next.js.
 */
export const nextJsConfig: Linter.FlatConfig[] = [
  ...baseConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  eslintConfigPrettier,
]; 