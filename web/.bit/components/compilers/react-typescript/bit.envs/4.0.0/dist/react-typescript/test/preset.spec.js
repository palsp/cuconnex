"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const react_preset_1 = require("../src/react-preset");
describe("TypeScript Preset", function () {
  it("should return getDynamicConfig function from React-TypeScript Preset", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig;
    chai_1.expect(preset).to.exist;
  });
  it("should return compilerPath from getDynamicConfig function", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig()
      : {};
    chai_1.expect(preset.compilerPath).to.equal("typescript/bin/tsc");
  });
  it("should return configFileName from getDynamicConfig function", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig()
      : {};
    chai_1.expect(preset.configFileName).to.equal("tsconfig.json");
  });
  it("should override compiledFileTypes in getDynamicConfig function", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig({
          compiledFileTypes: [".tsx"],
        })
      : {};
    chai_1.expect(preset.compiledFileTypes).to.eql([".tsx"]);
  });
  it("should override compilerArguments in getDynamicConfig function", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig({ compilerArguments: [] })
      : {};
    chai_1.expect(preset.compilerArguments).to.eql([]);
  });
  it("should set development to true", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig({ development: true })
      : {};
    chai_1.expect(preset.development).to.be.true;
  });
  it("should set development to false", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig({ development: false })
      : {};
    chai_1.expect(preset.development).to.be.false;
  });
  it("should set development to false", function () {
    const preset = react_preset_1.reactPreset.getDynamicConfig
      ? react_preset_1.reactPreset.getDynamicConfig()
      : {};
    chai_1.expect(preset.development).to.be.false;
  });
});
