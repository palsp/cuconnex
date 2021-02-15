module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["./src/test/setup.ts"],
};