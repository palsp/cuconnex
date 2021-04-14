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
exports.removeWorkspace = exports.getFileName = exports.buildComponentInWorkspace = exports.getBitAddCommand = exports.getDefaultComponent = void 0;
const create_workspace_1 = require("./create-workspace");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const rimraf_1 = __importDefault(require("rimraf"));
function getDefaultComponent() {
  return {
    "src/comp.tsx": `
    import React from 'react'
    export class HelloWorld {
        render() {
            return <div>Hello-World</div>
        }
    }`,
    "src/test.css": "",
    "src/types.d.ts": "",
    "src/try.svg": "",
  };
}
exports.getDefaultComponent = getDefaultComponent;
function getBitAddCommand(files, compId) {
  let bitAddCommand = "bit add";
  let testsFiles = "";
  files.forEach((filePath) => {
    if (filePath.includes(".spec.")) {
      testsFiles += `${filePath},`;
    } else {
      bitAddCommand += ` ${filePath}`;
    }
  });
  testsFiles = testsFiles.substring(0, testsFiles.length - 1);
  bitAddCommand += ` --main ${files[0]} --id ${compId} --tests "${testsFiles}"`;
  return bitAddCommand;
}
exports.getBitAddCommand = getBitAddCommand;
function buildComponentInWorkspace(helper, opts) {
  return __awaiter(this, void 0, void 0, function* () {
    const results = { directory: "", files: [], showComponent: {} };
    const component = (opts && opts.component) || getDefaultComponent();
    const files = Object.keys(component);
    let compId = getFileName(files[0]);
    compId = compId.substring(0, compId.indexOf("."));
    results.directory = yield create_workspace_1.createWorkspace(component, {
      env: (opts && opts.compilerPath) || "dist/src/index.js",
      envTester: (opts && opts.envTester) || "",
      name: "typescript",
      packageJSON: {
        dependencies: {
          "@types/react": "^16.9.11",
          react: "^16.11.0",
        },
      },
    });
    helper.scopeHelper.initWorkspace(results.directory);
    helper.command.runCmd(getBitAddCommand(files, compId), results.directory);
    let output = "";
    if (!opts || opts.disableBuildStep !== true) {
      output = helper.env.command.runCmd(
        getCommandString(compId, opts),
        results.directory
      );
      results.files = yield fs_extra_1.default.readdir(
        path_1.default.join(results.directory, "/dist")
      );
    }
    if (opts && opts.shouldPrintOutput) {
      console.log("------------output------------");
      console.log(output);
      console.log("------------output------------");
    }
    results.showComponent = JSON.parse(
      helper.command.runCmd(`bit show ${compId} --json`, results.directory)
    );
    return results;
  });
}
exports.buildComponentInWorkspace = buildComponentInWorkspace;
function getFileName(path) {
  return path.replace(/^.*[\\\/]/, "");
}
exports.getFileName = getFileName;
function getCommandString(compId, opts) {
  return opts && opts.shouldDebugEnvironment
    ? `node --inspect-brk $(which bit) build ${compId}`
    : `bit build ${compId}`;
}
function removeWorkspace(directory) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) =>
      rimraf_1.default(directory, {}, (error) => (error ? reject() : resolve()))
    );
  });
}
exports.removeWorkspace = removeWorkspace;
