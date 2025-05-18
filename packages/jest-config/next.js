const reactConfig = require('./react');

/** @type {import('jest').Config} */
const config = {
  ...reactConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...reactConfig.moduleNameMapper,
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};

module.exports = config;