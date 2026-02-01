module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,               // samodejno zbira coverage
  coverageDirectory: "coverage",       // mapa, kjer se shrani coverage report
  coverageReporters: ["text", "lcov"], // text = console, lcov = HTML report
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
    "!pages/_app.js",                  // lahko izključiš nekatere datoteke
    "!pages/_document.js"
  ]
};
