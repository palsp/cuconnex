import { Sequelize } from 'sequelize-typescript';
import * as originalSequelize from 'sequelize';
import { Role } from './role.model';
import User from './user.model';
const config = require("../config/db.config.ts");


//Create new sequelize instance with the configured parameters
const sequelizeInstance = new Sequelize({
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
export const db = (): DB => ({
    Sequelize: originalSequelize,
    sequelize: sequelizeInstance,
    user: '' ,
    role: '',
    ROLES: [],
});

db.Sequelize = originalSequelize;
db.sequelize = sequelizeInstance;

db.user = require("../models/user.model.ts");
db.role = require("../models/role.model.ts");

db.ROLES = ["user", "admin", "moderator"];

