"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bit_envs_compilers_typescript_1 = require("@bit/bit.envs.compilers.typescript");
const react_preset_1 = require("./react-preset");
exports.default = new bit_envs_compilers_typescript_1.TypescriptCompiler(
  react_preset_1.reactPreset
);
