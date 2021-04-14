"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var os = require("os");
function getCapsuleName(infix) {
  if (infix === void 0) {
    infix = "";
  }
  var uuidHack =
    "capsule-" + (infix ? infix + "-" : "") + Date.now().toString().slice(-5);
  var targetDir = path_1.default.join(os.tmpdir(), "bit", uuidHack);
  return targetDir;
}
exports.getCapsuleName = getCapsuleName;
