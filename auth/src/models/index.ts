import { Sequelize } from 'sequelize-typescript';

const config = require("../config/db.config.js");


//Create new sequelize instance with the configured parameters
const sequelize = new Sequelize({
    database: config.DB,
    dialect: config.dialect,
    username: config.USER,
    password: config.PASSWORD,
    storage: ':memory:',
    models: [__dirname + '/models/**/*.model.ts'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
})
interface DB {
    Sequelize: any,
    sequelize: any,
    user: any,
    role: any,
    ROLES: Array<String>,
}
const db = (): DB => ({
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: "" ,
    role: '',
    ROLES: [],
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

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