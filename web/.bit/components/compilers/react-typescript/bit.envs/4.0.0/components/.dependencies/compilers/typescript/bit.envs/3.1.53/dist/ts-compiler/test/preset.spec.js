"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const typescript_preset_1 = require("../src/typescript-preset");
describe("TypeScript Preset", function () {
  it("should return getDynamicConfig function from TypeScript Preset", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig;
    chai_1.expect(preset).to.exist;
  });
  it("should return compilerPath from getDynamicConfig function", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig()
      : {};
    chai_1.expect(preset.compilerPath).to.equal("typescript/bin/tsc");
  });
  it("should return configFileName from getDynamicConfig function", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig()
      : {};
    chai_1.expect(preset.configFileName).to.equal("tsconfig.json");
  });
  it("should override compiledFileTypes in getDynamicConfig function", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig({
          compiledFileTypes: [".ts"],
        })
      : {};
    chai_1.expect(preset.compiledFileTypes).to.eql([".ts"]);
  });
  it("should override compilerArguments in getDynamicConfig function", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig({
          compilerArguments: [],
        })
      : {};
    chai_1.expect(preset.compilerArguments).to.eql([]);
  });
  it("should set development to true", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig({
          development: true,
        })
      : {};
    chai_1.expect(preset.development).to.be.true;
  });
  it("should set development to false", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig({
          development: false,
        })
      : {};
    chai_1.expect(preset.development).to.be.false;
  });
  it("should set development to false", function () {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig()
      : {};
    chai_1.expect(preset.development).to.be.false;
  });
});
