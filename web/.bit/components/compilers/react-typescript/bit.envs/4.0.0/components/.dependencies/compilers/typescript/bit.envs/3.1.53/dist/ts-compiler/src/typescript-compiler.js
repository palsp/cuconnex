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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypescriptCompiler = void 0;
const lodash_1 = require("lodash");
const compile_1 = require("./compile");
class TypescriptCompiler {
  constructor(preset = {}) {
    this.preset = preset;
    this.getDynamicPackageDependencies = this.getDynamicPackageDependencies.bind(
      this
    );
    this.getDynamicConfig = this.getDynamicConfig.bind(this);
    this.action = this.action.bind(this);
  }
  init(ctx) {
    this._logger = ctx.api.getLogger();
    return {
      write: true,
    };
  }
  getDynamicPackageDependencies(ctx, name) {
    return this.preset.getDynamicPackageDependencies
      ? this.preset.getDynamicPackageDependencies(ctx)
      : {};
  }
  getDynamicConfig(ctx) {
    const presetConfig = this.preset.getDynamicConfig
      ? this.preset.getDynamicConfig(ctx.rawConfig)
      : {};
    return lodash_1.merge({}, presetConfig, ctx.rawConfig);
  }
  action(compilerContext) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield compile_1.compile(compilerContext, this.preset);
    });
  }
  get logger() {
    return this._logger;
  }
}
exports.TypescriptCompiler = TypescriptCompiler;
