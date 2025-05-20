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
  collectCoverage: false,
  passWithNoTests: true,
};