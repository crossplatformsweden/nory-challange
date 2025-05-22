// Base Jest configuration for React components
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    }],
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/dist/**', '!**/build/**'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.turbo/',
    '/dist/',
  ],
};