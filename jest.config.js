module.exports = {
  coverageReporters: ["text-summary", "html"],
  rootDir: "src",
  setupFilesAfterEnv: [
    "../scripts/setup-jest.js",
    "@testing-library/react/cleanup-after-each",
  ],
  globals: {
    "process.env": {
      NODE_ENV: "test",
    },
  },
  moduleNameMapper: {
    "^styled-components":
      "<rootDir>/../node_modules/styled-components/dist/styled-components.browser.cjs.js",
  },
};
