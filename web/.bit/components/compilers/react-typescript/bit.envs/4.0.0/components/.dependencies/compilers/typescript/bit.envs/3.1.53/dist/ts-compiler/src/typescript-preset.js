"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeScriptPreset = void 0;
const tsconfig_1 = require("./tsconfig");
const COMPILED_EXTENSIONS = [".ts", ".tsx"];
const IGNORED_FILES = ["package.json", "package-lock.json", "tsconfig.json"];
exports.typeScriptPreset = {
  getDynamicConfig(rawConfig) {
    const config = Object.assign(
      {
        compilerArguments: ["--declaration"],
        compiledFileTypes: COMPILED_EXTENSIONS,
        configFileName: "tsconfig.json",
        tsconfig: {},
        development: false,
        copyPolicy: {},
      },
      rawConfig || {}
    );
    const isDev = config.development;
    return {
      compilerPath: "typescript/bin/tsc",
      compilerArguments: config.compilerArguments,
      compiledFileTypes: config.compiledFileTypes,
      configFileName: "tsconfig.json",
      tsconfig: tsconfig_1.getTSConfig(isDev, config.tsconfig),
      development: isDev,
      copyPolicy: {
        ignorePatterns: config.copyPolicy.ignorePatterns || IGNORED_FILES,
        disable: false,
      },
    };
  },
};
