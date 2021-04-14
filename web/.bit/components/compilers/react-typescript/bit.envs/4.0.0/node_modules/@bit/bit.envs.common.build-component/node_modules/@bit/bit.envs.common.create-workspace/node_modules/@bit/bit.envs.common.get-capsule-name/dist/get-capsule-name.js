"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapsuleName = void 0;
const path_1 = __importDefault(require("path"));
const os = require("os");
function getCapsuleName(infix = "") {
  const uuidHack = `capsule-${
    infix ? `${infix}-` : ""
  }${Date.now().toString().slice(-5)}`;
  const targetDir = path_1.default.join(os.tmpdir(), "bit", uuidHack);
  return targetDir;
}
exports.getCapsuleName = getCapsuleName;
