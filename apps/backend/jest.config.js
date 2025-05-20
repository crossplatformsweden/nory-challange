/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.{ts,js}', '!**/node_modules/**'],
  setupFilesAfterEnv: [],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!@repo/zod-clients)'],
  moduleNameMapper: {
    '^@repo/zod-clients$':
      '<rootDir>/../../../packages/zod-clients/src/index.ts',
    '^@repo/zod-clients/(.*)$':
      '<rootDir>/../../../packages/zod-clients/src/$1',
  },
  // Add more custom config as needed
};
