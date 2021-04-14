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
const tsconfig_1 = require("../src/tsconfig");
const chai_1 = require("chai");
const e2e_helper_1 = __importDefault(
  require("bit-bin/dist/e2e-helper/e2e-helper")
);
const bit_envs_common_create_workspace_1 = require("@bit/bit.envs.common.create-workspace");
const bit_envs_common_build_component_1 = require("@bit/bit.envs.common.build-component");
const compile_1 = require("../src/compile");
describe("Side effects", function () {
  it("tsconfig out dir can not be changed", function () {
    const config = tsconfig_1.getTSConfig(true, {
      compilerOptions: { outDir: "other" },
    });
    chai_1.expect(config.compilerOptions.outDir).to.equal("dist");
  });
  it("tsconfig target to be ES2017 if development flag is true", function () {
    const config = tsconfig_1.getTSConfig(true, {});
    chai_1.expect(config.compilerOptions.target).to.equal("ES2017");
  });
  it("tsconfig target to be ES2015 if development flag is false", function () {
    const config = tsconfig_1.getTSConfig(false, {});
    chai_1.expect(config.compilerOptions.target).to.equal("ES2015");
  });
  it("when development flag is true, sourceMap is true and inlineSourceMap cannot be also true", function () {
    const config = tsconfig_1.getTSConfig(true, {});
    chai_1.expect(config.compilerOptions.inlineSourceMap).to.equal(false);
  });
  it("should find mainDistFile for ts", function () {
    return __awaiter(this, void 0, void 0, function* () {
      this.timeout(1000 * 60 * 10);
      const helper = new e2e_helper_1.default();
      const directory = yield bit_envs_common_create_workspace_1.createWorkspace(
        {
          "src/Focus/index.ts": `
        export function print(msg:string) {
          console.log(msg)
        }
      `,
          "src/TrapFocus/index.ts": `
      import {print} from '../Focus';
      `,
        },
        {
          env: "dist/src/index.js",
          name: "MainDistFile",
        }
      );
      helper.scopeHelper.initWorkspace(directory);
      helper.command.runCmd("bit add src/Focus/index.ts --id focus", directory);
      helper.command.runCmd(
        "bit add src/TrapFocus/index.ts --id trap-focus",
        directory
      );
      helper.command.runCmd("bit build trap-focus", directory);
      const files = yield compile_1.collectDistFiles({
        directory,
        srcTestFiles: [],
      });
      const testFiles = [];
      const main = compile_1.findMainFile(
        { directory, main: "TrapFocus/index.ts" },
        files
      );
      chai_1.expect(main).to.equal("TrapFocus/index.js");
      yield bit_envs_common_build_component_1.removeWorkspace(directory);
    });
  });
  it("should find mainDistFile for tsx", function () {
    return __awaiter(this, void 0, void 0, function* () {
      this.timeout(1000 * 60 * 10);
      const helper = new e2e_helper_1.default();
      const directory = yield bit_envs_common_create_workspace_1.createWorkspace(
        {
          "src/Focus/index.tsx": `
        export function print(msg:string) {
          console.log(msg)
        }
      `,
          "src/TrapFocus/index.tsx": `
      import {print} from '../Focus';
      `,
        },
        {
          env: "dist/src/index.js",
          name: "MainDistFile",
        }
      );
      helper.scopeHelper.initWorkspace(directory);
      helper.command.runCmd(
        "bit add src/Focus/index.tsx --id focus",
        directory
      );
      helper.command.runCmd(
        "bit add src/TrapFocus/index.tsx --id trap-focus",
        directory
      );
      helper.command.runCmd("bit build trap-focus", directory);
      const files = yield compile_1.collectDistFiles({
        directory,
        srcTestFiles: [],
      });
      const testFiles = [];
      const main = compile_1.findMainFile(
        { directory, main: "TrapFocus/index.tsx" },
        files
      );
      chai_1.expect(main).to.equal("TrapFocus/index.js");
      yield bit_envs_common_build_component_1.removeWorkspace(directory);
    });
  });
  it("should find mainDistFile for js", function () {
    return __awaiter(this, void 0, void 0, function* () {
      this.timeout(1000 * 60 * 10);
      const helper = new e2e_helper_1.default();
      const directory = yield bit_envs_common_create_workspace_1.createWorkspace(
        {
          "src/Focus/index.js": `
        export function print(msg:string) {
          console.log(msg)
        }
      `,
          "src/TrapFocus/index.js": `
      import {print} from '../Focus';
      `,
        },
        {
          env: "dist/src/index.js",
          name: "MainDistFile",
        }
      );
      helper.scopeHelper.initWorkspace(directory);
      helper.command.runCmd("bit add src/Focus/index.js --id focus", directory);
      helper.command.runCmd(
        "bit add src/TrapFocus/index.js --id trap-focus",
        directory
      );
      helper.command.runCmd("bit build trap-focus", directory);
      const files = yield compile_1.collectDistFiles({
        directory,
        srcTestFiles: [],
      });
      const main = compile_1.findMainFile(
        { directory, main: "TrapFocus/index.js" },
        files
      );
      chai_1.expect(main).to.equal("TrapFocus/index.js");
      yield bit_envs_common_build_component_1.removeWorkspace(directory);
    });
  });
});
