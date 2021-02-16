import { Sequelize } from 'sequelize-typescript';
import { Role } from './role.model';
import { User } from './user.model';

const config = require("../config/db.config.ts");


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
export const db = (): DB => ({
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: '' ,
    role: '',
    ROLES: [],
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.ts");
db.role = require("../models/role.model.ts");

db.ROLES = ["user", "admin", "moderator"];

