module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  modulePathIgnorePatterns: ["bin", "docs", "dist", "example", "scripts"],
};
