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
const rimraf = require("rimraf");
const react_preset_1 = require("../src/react-preset");
const bit_envs_common_build_component_1 = require("@bit/bit.envs.common.build-component");
describe("typescript react", () => {
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
        helper,
        {
          compilerPath: "dist/src/index.js",
          envTester: "dist/src/index.js",
        }
      );
    });
  });
  after(function () {
    return __awaiter(this, void 0, void 0, function* () {
      if (results.directory) {
        return new Promise((resolve, reject) =>
          rimraf(results.directory, {}, (error) =>
            error ? reject() : resolve()
          )
        );
      }
    });
  });
  it("build should pass", function () {
    return __awaiter(this, void 0, void 0, function* () {});
  });
  it("should have correct dependencies", function () {
    const presetConfig = react_preset_1.reactPreset.getDynamicPackageDependencies();
    chai_1
      .expect(results.showComponent.compilerPackageDependencies)
      .to.deep.equal(presetConfig);
  });
});
