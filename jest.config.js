module.exports = {
  preset: '@shelf/jest-mongodb',
  clearMocks: true,
  bail: true,
  collectCoverageFrom: ['<rootDir>/sc/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-node',
  watchPathIgnorePatterns: ['globalConfig'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
