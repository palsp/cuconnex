"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_compiler_1 = require("../src/typescript-compiler");
const typescript_preset_1 = require("../src/typescript-preset");
const toSpy = new typescript_compiler_1.TypescriptCompiler(
  typescript_preset_1.typeScriptPreset
);
exports.default = toSpy;
