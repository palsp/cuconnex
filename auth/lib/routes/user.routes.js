"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const middleware_1 = require("../middleware");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_1 = __importDefault(require("express"));
//Define express router
exports.userRoutes = express_1.default.Router();
exports.userRoutes.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
exports.userRoutes.get("/all", user_controller_1.default.allAccess);
exports.userRoutes.get("/user", [middleware_1.authJwt.verifyToken], user_controller_1.default.userBoard);
exports.userRoutes.get("/admin", [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isAdmin], user_controller_1.default.adminBoard);
