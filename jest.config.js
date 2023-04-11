module.exports = {
  clearMocks: true,
  bail: true,
  // preset: 'ts-jest',
  preset: '@shelf/jest-mongodb',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  collectCoverageFrom: ['<rootDir>/sc/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
