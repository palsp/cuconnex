"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const e2e_helper_1 = __importDefault(
  require("bit-bin/dist/e2e-helper/e2e-helper")
);
const chai_1 = require("chai");
const vinyl_1 = __importDefault(require("vinyl"));
const bit_envs_common_build_component_1 = require("@bit/bit.envs.common.build-component");
const compile_1 = require("../src/compile");
const typescript_preset_1 = require("../src/typescript-preset");
describe("typescript", () => {
  const helper = new e2e_helper_1.default();
  let results = {
    directory: "",
    files: [],
    showComponent: {},
  };
  before(function () {
    return __awaiter(this, void 0, void 0, function* () {
      this.timeout(1000 * 10 * 10);
      results = yield bit_envs_common_build_component_1.buildComponentInWorkspace(
        helper
      );
    });
  });
  after(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      return bit_envs_common_build_component_1.removeWorkspace(
        results.directory
      );
    })
  );
  it("build should pass", () =>
    __awaiter(void 0, void 0, void 0, function* () {}));
  it("build should exclude default ignore patterns", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      chai_1.expect(results.files.indexOf("package.json")).to.equal(-1);
      chai_1.expect(results.files.indexOf("tsconfig.json")).to.equal(-1);
    }));
  it("should have a declaration file", () => {
    chai_1.expect(!!~results.files.indexOf("comp.d.ts")).to.be.true;
  });
  it("should copy non dist files", () => {
    chai_1.expect(!!~results.files.indexOf("test.css")).to.be.true;
    chai_1.expect(!!~results.files.indexOf("types.d.ts")).to.be.true;
    chai_1.expect(!!~results.files.indexOf("try.svg")).to.be.true;
  });
  it("should get non compiled files", () => {
    const preset = typescript_preset_1.typeScriptPreset.getDynamicConfig
      ? typescript_preset_1.typeScriptPreset.getDynamicConfig()
      : {};
    const compiledFileTypes = preset.compiledFileTypes;
    const filesPath = [
      "src/Focus/print.ts",
      "src/Focus/index.tsx",
      "src/Focus/profile.svg",
      "src/Focus/profile-png.png",
      "src/Focus/my-style.css",
    ];
    const files = filesPath.map((path) => {
      return new vinyl_1.default({ path });
    });
    const nonCompiledFiles = compile_1.getNonCompiledFiles(
      files,
      compiledFileTypes
    );
    chai_1.expect(nonCompiledFiles.length).to.equal(3);
    chai_1.expect(nonCompiledFiles[0].extname).to.equal(".svg");
    chai_1.expect(nonCompiledFiles[1].extname).to.equal(".png");
    chai_1.expect(nonCompiledFiles[2].extname).to.equal(".css");
  });
});
