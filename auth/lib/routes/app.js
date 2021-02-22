"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
const models_1 = require("../models");
const cors = __importStar(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const express = require('express');
const path = require('path');
exports.app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
exports.app.use(cors(corsOptions));
// parse requests of content-type - application/json
exports.app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use('/api/test', user_routes_1.userRoutes);
exports.app.use('/api/auth', auth_routes_1.authRoutes);
const Role = models_1.db.role;
models_1.db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});
exports.app.get('/api', (req, res) => {
    res.status(200).send("Hello World");
});
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}
