module.exports = {
  clearMocks: true,
  bail: true,
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: ["<rootDir>/sc/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
