import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@features/(.*)$": "<rootDir>/src/features/$1",
  },
  testMatch: ["**/*.test.ts"],
};

export default config;
