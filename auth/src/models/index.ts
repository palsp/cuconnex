import { Sequelize } from 'sequelize-typescript';
import * as originalSequelize from 'sequelize';
import Role from './role.model';
import User from './user.model';
const config = require("../config/db.config");


//Create new sequelize instance with the configured parameters
const sequelizeInstance = new Sequelize({
    database: config.DB,
    
    host: config.HOST,
    dialect: config.dialect,
    storage: ':memory:',
    models: [__dirname + '/user.model.ts', __dirname + '/role.model.ts', __dirname + '/userRoles.model.ts'],
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
console.log(__dirname + 'user.model.ts');
db.Sequelize = originalSequelize;
db.sequelize = sequelizeInstance;

db.user = require("../models/user.model");
db.role = require("../models/role.model");

db.ROLES = ["user", "admin", "moderator"];

