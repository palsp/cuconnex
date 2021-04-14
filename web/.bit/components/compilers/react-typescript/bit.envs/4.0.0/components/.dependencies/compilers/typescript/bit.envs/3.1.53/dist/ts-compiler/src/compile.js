"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.getCapsuleName = exports.collectDistFiles = exports.findMainFile = exports.getNonCompiledFiles = exports.compile = void 0;
const execa_1 = __importDefault(require("execa"));
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const vinyl_1 = __importDefault(require("vinyl"));
const tsconfig_1 = require("./tsconfig");
require("typescript");
const bit_envs_common_isolate_1 = require("@bit/bit.envs.common.isolate");
const md5_1 = __importDefault(require("md5"));
const os_1 = __importDefault(require("os"));
function compile(cc, preset) {
  return __awaiter(this, void 0, void 0, function* () {
    const isolateResult = yield bit_envs_common_isolate_1.isolate(cc);
    const { res, directory } = isolateResult;
    const srcTestFiles = getSrcTestFiles(cc.files);
    const context = yield createContext(res, directory, cc, srcTestFiles);
    let results = null;
    yield preCompile(context, preset);
    const compiledFileTypes = preset.getDynamicConfig
      ? preset.getDynamicConfig(cc.rawConfig).compiledFileTypes
      : [];
    if (
      getNonCompiledFiles(cc.files, compiledFileTypes).length ===
      cc.files.length
    ) {
      const dists = yield collectNonDistFiles(context);
      results = { dists };
    } else {
      results = yield _compile(context, cc, preset);
    }
    if (!process.env[bit_envs_common_isolate_1.DEBUG_FLAG]) {
      yield context.capsule.destroy();
    }
    if (preset.enrichResult) {
      return preset.enrichResult(results, context);
    }
    return results;
  });
}
exports.compile = compile;
function preCompile(context, preset) {
  return __awaiter(this, void 0, void 0, function* () {
    let promises = [createConfigFile(context)];
    if (preset.preCompile) {
      promises = [...promises, preset.preCompile(context)];
    }
    return Promise.all(promises);
  });
}
function runCompiler(action, preset) {
  return __awaiter(this, void 0, void 0, function* () {
    return preset.runCompiler
      ? Promise.all([action(), preset.runCompiler()])
      : action();
  });
}
function _compile(context, cc, preset) {
  return __awaiter(this, void 0, void 0, function* () {
    const pathToCompiler = require.resolve(cc.dynamicConfig.compilerPath);
    const compilerArguments = cc.dynamicConfig.compilerArguments;
    yield runCompiler(
      () =>
        runNodeScriptInDir(
          context.directory,
          pathToCompiler,
          compilerArguments
        ),
      preset
    );
    const dists = yield collectDistFiles(context);
    const nonCompiledDists = yield collectNonDistFiles(context);
    const mainFile = findMainFile(context, dists);
    return { dists: dists.concat(nonCompiledDists), mainFile };
  });
}
function getNonCompiledFiles(files, compiledFileTypes) {
  return files.filter((f) => {
    return !compiledFileTypes.includes(f.extname);
  });
}
exports.getNonCompiledFiles = getNonCompiledFiles;
function findMainFile(context, dists) {
  const compDistRoot = path_1.default.resolve(
    context.directory,
    tsconfig_1.FIXED_OUT_DIR
  );
  const sourceFileName = getNameOfFile(
    context.main,
    context.main.substring(context.main.indexOf("."))
  );
  const pathPrefix = `${compDistRoot}${
    compDistRoot.endsWith(path_1.default.sep) ? "" : path_1.default.sep
  }`;
  const distMainFileExt = ".js";
  const res = dists.find((val) => {
    if (!val.path.endsWith(distMainFileExt)) {
      return false;
    }
    const nameToCheck = getNameOfFile(val.path, distMainFileExt).split(
      pathPrefix
    )[1];
    return nameToCheck.endsWith(sourceFileName);
  });
  return (res || { relative: "" }).relative;
}
exports.findMainFile = findMainFile;
function createContext(res, directory, cc, srcTestFiles) {
  const componentObject = res.componentWithDependencies.component.toObject();
  return {
    main: componentObject.mainFile,
    dist: cc.context.rootDistDir,
    name: componentObject.name,
    capsule: res.capsule,
    directory,
    res,
    cc,
    srcTestFiles,
  };
}
function getSrcTestFiles(files) {
  return files.filter((f) => {
    return f.test === true;
  });
}
function runNodeScriptInDir(directory, scriptFile, args) {
  return __awaiter(this, void 0, void 0, function* () {
    let result = null;
    const cwd = process.cwd();
    try {
      process.chdir(directory);
      if (process.env[bit_envs_common_isolate_1.DEBUG_FLAG]) {
        console.log(` ${scriptFile} ${args.toString().replace(",", " ")}`);
      }
      result = yield execa_1.default(scriptFile, args, { stdout: 1 });
    } catch (e) {
      process.chdir(cwd);
      console.log();
      throw e;
    }
    process.chdir(cwd);
    return result;
  });
}
function createConfigFile(context) {
  return __awaiter(this, void 0, void 0, function* () {
    const configFileName = context.cc.dynamicConfig.configFileName;
    const content =
      context.cc.dynamicConfig[getNameOfFile(configFileName, ".")];
    const pathToConfig = getConfigFilePath(context);
    return fs.writeFile(pathToConfig, JSON.stringify(content, null, 4));
  });
}
function collectDistFiles(context) {
  return __awaiter(this, void 0, void 0, function* () {
    const capsuleDir = context.directory;
    const compDistRoot = path_1.default.resolve(
      capsuleDir,
      tsconfig_1.FIXED_OUT_DIR
    );
    const files = yield recursive_readdir_1.default(compDistRoot);
    const readFiles = yield Promise.all(
      files.map((file) => {
        return fs.readFile(file);
      })
    );
    return files.map((file, index) => {
      const relativePath = path_1.default.relative(
        path_1.default.join(capsuleDir, tsconfig_1.FIXED_OUT_DIR),
        file
      );
      const pathToFile = path_1.default.join(compDistRoot, relativePath);
      let test = false;
      if (getExt(relativePath) === "js") {
        test = isTestFile(context.srcTestFiles, relativePath, false);
      }
      return new vinyl_1.default({
        path: pathToFile,
        contents: readFiles[index],
        base: compDistRoot,
        test,
      });
    });
  });
}
exports.collectDistFiles = collectDistFiles;
function collectNonDistFiles(context) {
  return __awaiter(this, void 0, void 0, function* () {
    const dynamicConfig = context.cc.dynamicConfig;
    const copyPolicy = dynamicConfig.copyPolicy;
    if (dynamicConfig.copyPolicy.disable) {
      return Promise.resolve([]);
    }
    const capsuleDir = context.directory;
    const compDistRoot = path_1.default.resolve(
      capsuleDir,
      tsconfig_1.FIXED_OUT_DIR
    );
    const ignoreFunction = function (file, _stats) {
      if (file.endsWith(".d.ts")) {
        return false;
      }
      const defaultIgnore = [
        `node_modules${path_1.default.sep}`,
        tsconfig_1.FIXED_OUT_DIR,
        ".dependencies",
      ].concat(dynamicConfig.compiledFileTypes);
      return defaultIgnore
        .concat(copyPolicy.ignorePatterns)
        .reduce(function (prev, curr) {
          return prev || !!~file.indexOf(curr);
        }, false);
    };
    const fileList = yield recursive_readdir_1.default(capsuleDir, [
      ignoreFunction,
    ]);
    const readFiles = yield Promise.all(
      fileList.map((file) => {
        return fs.readFile(file);
      })
    );
    const list = fileList.map((file, index) => {
      const relativePath = path_1.default.relative(capsuleDir, file);
      const pathToFile = path_1.default.join(compDistRoot, relativePath);
      const test = false;
      return new vinyl_1.default({
        path: pathToFile,
        contents: readFiles[index],
        base: compDistRoot,
        test,
      });
    });
    return list;
  });
}
const getNameOfFile = (val, split) => val.split(split)[0];
function getConfigFilePath(context) {
  return path_1.default.join(
    context.directory,
    context.cc.dynamicConfig.configFileName
  );
}
function getExt(filename) {
  return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
}
function getWithoutExt(filename) {
  const ext = getExt(filename);
  return ext === filename
    ? filename
    : filename.substring(0, filename.length - ext.length - 1);
}
function isTestFile(srcTestFiles, fileToCheck, compareWithExtension = true) {
  const found = srcTestFiles.find((testFile) => {
    if (compareWithExtension) {
      return testFile.relative === fileToCheck;
    }
    return getWithoutExt(testFile.relative).endsWith(
      getWithoutExt(fileToCheck)
    );
  });
  return !!found;
}
function getCapsuleName(ctx) {
  const { name, version } = ctx.context.componentObject;
  const componentInProjectId = md5_1.default(
    `${ctx.context.rootDistDir}${name}${version}`
  );
  const targetDir = path_1.default.join(
    os_1.default.tmpdir(),
    "bit",
    componentInProjectId
  );
  return targetDir;
}
exports.getCapsuleName = getCapsuleName;
