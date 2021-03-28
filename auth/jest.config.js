module.exports = {
    preset: "ts-jest",
    verbose:true,
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["./src/test/setup.ts"],
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },
};