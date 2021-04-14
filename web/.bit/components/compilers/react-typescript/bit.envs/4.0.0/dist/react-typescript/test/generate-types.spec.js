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
const bit_envs_common_create_workspace_1 = require("@bit/bit.envs.common.create-workspace");
const generate_types_1 = require("../src/generate-types");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const chai_1 = require("chai");
const generate_types_2 = require("../src/generate-types");
describe("generate types", function () {
  it("should generate to css, sass, scss, svg, jpg, jpeg, webp, png, ico, gif, bmp files", function () {
    return __awaiter(this, void 0, void 0, function* () {
      const component = () => ({
        "src/index.css": "",
        "index.css": "",
        "src/sass-file.sass": "",
        "src/scss-file.scss": "",
        "src/svg-file.svg": "",
        "src/jpg-file.jpg": "",
        "src/jpeg-file.jpeg": "",
        "src/webp-file.webp": "",
        "src/png-file.png": "",
        "src/ico-file.ico": "",
        "src/gif-file.gif": "",
        "src/bmp-file.bmp": "",
      });
      const directory = yield bit_envs_common_create_workspace_1.createWorkspace(
        component(),
        {
          env: "",
          name: "test generate types",
        }
      );
      yield generate_types_1.generateTypes(directory);
      const files = (yield recursive_readdir_1.default(directory, [
        ".dependencies",
        "dist",
        "node_module",
      ]))
        .map((file) => file.split(`${directory}/`)[1])
        .filter((val) => val.endsWith(".d.ts"));
      Object.keys(component()).forEach(function (filePath) {
        chai_1.expect(
          !!~files.indexOf(`${filePath}.d.ts`),
          filePath
        ).to.be.true;
      });
    });
  });
  it('getGenericStyle declaration .d.ts file needs to start with "declare"', () => {
    chai_1.expect(generate_types_2.getGenericStyle().startsWith("declare"));
  });
  it('getImageType declaration .d.ts file needs to start with "declare"', () => {
    chai_1.expect(generate_types_2.getImageType().startsWith("declare"));
  });
  it('getSVGType declaration .d.ts file needs to include "declare"', () => {
    chai_1.expect(generate_types_2.getSVGType().includes("declare"));
  });
});
