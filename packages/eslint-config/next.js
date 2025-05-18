import baseConfig from "./base.js";
import eslintConfigPrettier from "eslint-config-prettier";
import nextPlugin from "@next/eslint-plugin-next";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 */
export const nextJsConfig = [
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
      // Temporarily disable the rule causing issues with ESLint v9
      "@next/next/no-duplicate-head": "off",
    },
  },
  eslintConfigPrettier,
];
