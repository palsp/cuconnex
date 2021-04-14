"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypescriptCompiler = void 0;
const typescript_compiler_1 = require("./typescript-compiler");
Object.defineProperty(exports, "TypescriptCompiler", {
  enumerable: true,
  get: function () {
    return typescript_compiler_1.TypescriptCompiler;
  },
});
const typescript_preset_1 = require("./typescript-preset");
exports.default = new typescript_compiler_1.TypescriptCompiler(
  typescript_preset_1.typeScriptPreset
);
