import reactConfig from "./react.js";

/** @type {import('jest').Config} */
const config = {
  ...reactConfig,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ...reactConfig.moduleNameMapper,
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    ...reactConfig.transform,
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

export default config;