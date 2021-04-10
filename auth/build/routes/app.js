"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const auth_routes_1 = require("./auth.routes");
require('express-async-errors');
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const body_parser_1 = require("body-parser");
const common_1 = require("@cuconnex/common");
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
exports.app.use(cors_1.default());
exports.app.set('trust proxy', true);
/*Initialize Middlewares*/
exports.app.use(cors_1.default());
// parse requests of content-type - application/json
exports.app.use(body_parser_1.json());
// parse requests of content-type - application/x-www-form-urlencoded
exports.app.use(body_parser_1.urlencoded({ extended: true }));
//Parses cookies
// app.use(cookieParser())
exports.app.use(cookie_session_1.default({
    signed: false,
    secure: false,
}));
/* Initialize all the handler */
// app.use('/api/test', userRoutes);
exports.app.use('/api/auth', auth_routes_1.authRoutes);
exports.app.use(common_1.errorHandling);
