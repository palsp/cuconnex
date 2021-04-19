"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
require('express-async-errors');
const search_routes_1 = require("./routes/search.routes");
const app = express_1.default();
exports.app = app;
app.use(body_parser_1.json());
app.use(cors_1.default());
app.use(cookie_session_1.default({
    signed: false,
    secure: false,
    // httpOnly : true,
}));
app.use("/api/query", search_routes_1.searchRouter);
