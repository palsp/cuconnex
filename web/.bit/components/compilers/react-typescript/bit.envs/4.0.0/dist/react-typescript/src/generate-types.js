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
exports.generateTypes = exports.getImageType = exports.getSVGType = exports.getGenericStyle = void 0;
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function getGenericStyle() {
  return `
  declare const style: {[k:string]:string};
  export default style;
    `;
}
exports.getGenericStyle = getGenericStyle;
function getSVGType() {
  return `
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  declare const src:string;
  export default src;
    `;
}
exports.getSVGType = getSVGType;
function getImageType() {
  return `
    declare const image: string;
    export default image;
    `;
}
exports.getImageType = getImageType;
function getStrategies() {
  const strategies = {
    css: getGenericStyle(),
    sass: getGenericStyle(),
    scss: getGenericStyle(),
    svg: getSVGType(),
    jpg: getImageType(),
    jpeg: getImageType(),
    webp: getImageType(),
    png: getImageType(),
    ico: getImageType(),
    gif: getImageType(),
    bmp: getImageType(),
  };
  return strategies;
}
function generateTypes(_dir) {
  return __awaiter(this, void 0, void 0, function* () {
    const strategies = getStrategies();
    const dir = yield recursive_readdir_1.default(_dir, [
      "node_modules",
      "dist",
      ".dependencies",
    ]);
    const filesToCreate = dir.filter((file) =>
      Object.keys(strategies).some((extension) =>
        file.endsWith(`.${extension}`)
      )
    );
    return yield Promise.all(
      filesToCreate.map((file) => {
        const extension = file.split(".")[file.split(".").length - 1];
        const content = strategies[extension];
        const dtsFilePath = `${file}.d.ts`;
        if (!fs_extra_1.default.existsSync(dtsFilePath)) {
          return fs_extra_1.default.writeFile(dtsFilePath, content);
        }
        return Promise.resolve();
      })
    );
  });
}
exports.generateTypes = generateTypes;
