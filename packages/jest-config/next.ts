import reactConfig from './react';
import type { Config } from 'jest';

const config: Config = {
  ...reactConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...reactConfig.moduleNameMapper,
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};

export default config; 