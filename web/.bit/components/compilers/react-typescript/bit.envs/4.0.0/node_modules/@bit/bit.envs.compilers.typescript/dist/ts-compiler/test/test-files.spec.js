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
const bit_envs_common_build_component_1 = require("@bit/bit.envs.common.build-component");
const e2e_helper_1 = __importDefault(
  require("bit-bin/dist/e2e-helper/e2e-helper")
);
const bit_bin_1 = require("bit-bin");
const chai_1 = require("chai");
const spy_compiler_1 = __importDefault(require("./spy-compiler"));
const sinon_1 = __importDefault(require("sinon"));
describe("test files", function () {
  const helper = new e2e_helper_1.default();
  let results = null;
  const spy = sinon_1.default.spy(spy_compiler_1.default, "action");
  before(function () {
    return __awaiter(this, void 0, void 0, function* () {
      this.timeout(1000 * 60);
      const component = bit_envs_common_build_component_1.getDefaultComponent();
      component["test/test.spec.ts"] = "";
      results = yield bit_envs_common_build_component_1.buildComponentInWorkspace(
        helper,
        {
          disableBuildStep: true,
          component,
          compilerPath: "./dist/test/spy-compiler.js",
        }
      );
      helper.command.runCmd(
        "bit add -t test/test.spec.ts --id comp",
        results.directory
      );
    });
  });
  after(function () {
    return __awaiter(this, void 0, void 0, function* () {
      spy.restore();
      return bit_envs_common_build_component_1.removeWorkspace(
        results.directory
      );
    });
  });
  it("should mark as test dist file", function () {
    return __awaiter(this, void 0, void 0, function* () {
      this.timeout(1000 * 60 * 10);
      const cwd = process.cwd();
      const files = yield bit_bin_1.buildOne(
        "comp",
        false,
        false,
        results.directory
      );
      process.chdir(cwd);
      chai_1.expect(spy === spy_compiler_1.default.action).to.be.true;
      chai_1.expect(spy.callCount).to.equal(1);
      const returnedTestFile = (yield spy.returnValues[0]).dists.find(
        (elem) => elem.basename === "test.spec.js"
      );
      chai_1.expect(returnedTestFile.test).to.be.true;
    });
  });
});
