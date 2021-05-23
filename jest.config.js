module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  modulePathIgnorePatterns: ["bin", "docs", "dist", "example"],
};
