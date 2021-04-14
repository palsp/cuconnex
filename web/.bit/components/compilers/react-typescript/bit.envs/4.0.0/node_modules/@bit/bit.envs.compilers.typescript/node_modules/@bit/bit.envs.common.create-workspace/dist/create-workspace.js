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
exports.createWorkspace = void 0;
const fs_1 = require("fs");
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const get_capsule_name_1 = require("./get-capsule-name");
function createWorkspace(content, options) {
  return __awaiter(this, void 0, void 0, function* () {
    const targetDir = get_capsule_name_1.getCapsuleName("space");
    enrichContentWithDefaults(content, options);
    yield createFS(targetDir, content);
    return targetDir;
  });
}
exports.createWorkspace = createWorkspace;
function mkdirPromise(dir, opts) {
  return new Promise((resolve, reject) => {
    mkdirp_1.default(dir, opts, (err, made) =>
      err === null ? resolve(made) : reject(err)
    );
  });
}
function createFS(targetDir, content) {
  return __awaiter(this, void 0, void 0, function* () {
    yield mkdirPromise(targetDir, {});
    yield Promise.all(
      Object.keys(content).map((key) =>
        __awaiter(this, void 0, void 0, function* () {
          const realPath = path_1.default.join(targetDir, key);
          const containingFolder = path_1.default.dirname(realPath);
          yield mkdirPromise(containingFolder, {});
          const filePath = path_1.default.resolve(targetDir, key);
          yield fs_1.promises.writeFile(filePath, content[key]);
        })
      )
    );
  });
}
function enrichContentWithDefaults(content, options) {
  const packageJSON = Object.assign(
    {
      name: options.name,
      description: `Testing ${options.name}`,
      version: "0.0.1",
      bit: {
        env: {
          compiler: {
            meta: {
              options: {
                file: path_1.default.resolve(options.env),
              },
            },
          },
          tester: {
            meta2: {
              options: {
                file: options.envTester
                  ? path_1.default.resolve(options.envTester)
                  : "",
              },
            },
          },
        },
        componentsDefaultDirectory: "components/{name}",
        packageManager: "npm",
      },
    },
    options.packageJSON || {}
  );
  content["package.json"] =
    content["package.json"] || JSON.stringify(packageJSON, null, 4);
  content[".gitignore"] = content[".gitignore"] || `dist\nnode_modules\n`;
}
