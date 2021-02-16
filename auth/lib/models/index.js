"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config = require("../config/db.config.ts");
//Create new sequelize instance with the configured parameters
const sequelize = new sequelize_typescript_1.Sequelize({
    database: config.DB,
    dialect: config.dialect,
    username: config.USER,
    password: config.PASSWORD,
    storage: ':memory:',
    models: [__dirname + '/models/**/*.model.ts'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
exports.db = () => ({
    Sequelize: sequelize_typescript_1.Sequelize,
    sequelize: sequelize,
    user: '',
    role: '',
    ROLES: [],
});
exports.db.Sequelize = sequelize_typescript_1.Sequelize;
exports.db.sequelize = sequelize;
exports.db.user = require("../models/user.model.ts");
exports.db.role = require("../models/role.model.ts");
exports.db.ROLES = ["user", "admin", "moderator"];
