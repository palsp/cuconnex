"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config = require("../config/db.config.js");
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
const db = () => ({
    Sequelize: sequelize_typescript_1.Sequelize,
    sequelize: sequelize,
    user: "",
    role: '',
    ROLES: [],
});
db.Sequelize = sequelize_typescript_1.Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, sequelize_typescript_1.Sequelize);
db.role = require("../models/role.model.js")(sequelize, sequelize_typescript_1.Sequelize);
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
