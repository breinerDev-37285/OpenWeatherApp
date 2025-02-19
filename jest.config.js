const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customConfig = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!(@babel/runtime|@babel/runtime-corejs3)/)",
  ],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
    "^@/interfaces/(.*)$": "<rootDir>/interfaces/$1",
    "^@/redux/(.*)$": "<rootDir>/redux/$1",
    "^@/helpers/(.*)$": "<rootDir>/helpers/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/spec/setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/dist/",
    "/coverage/",
    "/src/interfaces/",
    "jest.config.js",
    "next.config.js",
    ".d.ts",
    "src/app/layout.tsx",
    "src/lib/config.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customConfig);
