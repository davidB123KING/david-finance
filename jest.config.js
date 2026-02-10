const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
  collectCoverageFrom: ["app/**/*.{js,jsx,ts,tsx}", "lib/**/*.{js,jsx,ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);
