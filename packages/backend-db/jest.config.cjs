/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      isolatedModules: true,
    }],
  },
  testMatch: [
    '**/src/tests/**/*.test.ts'
  ],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/node_modules/**', '!**/dist/**', '!**/build/**'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  passWithNoTests: true,
};