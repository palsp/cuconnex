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
exports.db = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const originalSequelize = __importStar(require("sequelize"));
const config = require("../config/db.config");
//Create new sequelize instance with the configured parameters
const sequelizeInstance = new sequelize_typescript_1.Sequelize({
    database: config.DB,
    username: config.USER,
    password: config.PASSWORD,
    host: config.HOST,
    dialect: config.dialect,
    storage: ':memory:',
    models: [__dirname + '/models/**/*.model'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
exports.db = () => ({
    Sequelize: originalSequelize,
    sequelize: sequelizeInstance,
    user: '',
    role: '',
    ROLES: [],
});
exports.db.Sequelize = originalSequelize;
exports.db.sequelize = sequelizeInstance;
exports.db.user = require("../models/user.model");
exports.db.role = require("../models/role.model");
exports.db.ROLES = ["user", "admin", "moderator"];
