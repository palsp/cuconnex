"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const middleware_1 = require("../middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = __importDefault(require("express"));
exports.authRoutes = express_1.default.Router();
exports.authRoutes.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
exports.authRoutes.post("/signup", [middleware_1.verifySignUp.checkDuplicateStudentIdOrEmail, middleware_1.verifySignUp.checkRolesExisted], auth_controller_1.signUp);
exports.authRoutes.post("/signin", auth_controller_1.signIn);
