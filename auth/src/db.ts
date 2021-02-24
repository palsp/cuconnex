// import { Sequelize } from 'sequelize-typescript';
// import * as originalSequelize from 'sequelize';
import { Sequelize } from 'sequelize';
// import Role from './role.model';
import { userInit } from './models/user.model';
import { db_config as config } from './config/db.config'
import mysql, { Connection } from 'mysql2/promise'


// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//     dialect: 'mysql',
//     host: config.HOST,
// })


// interface DB {
//     sequelize: Sequelize,
//     user: User,
//     ROLES: Array<String>,
// }

// export const initializeDB = async () => {
//     userInit(sequelize);
//     await sequelize.sync({ force: true });
// };

// export const endDB = async (db: any) => {
//     await db.sequelize.close();
// }

// // export const db: DB = {
// //     sequelize: sequelizeInstance,
// //     user: require('../models/users.model'),
// //     role: require('../models/role.model'),
// //     ROLES: ["user", "admin", "moderator"],
// // };

// // console.log(__dirname + 'user.model.ts');
// // db.Sequelize = originalSequelize;
// // db.sequelize = sequelizeInstance;

// // db.user = require("../models/user.model");
// // db.role = require("../models/role.model");

// // db.ROLES = ["user", "admin", "moderator"];


interface myDB {
    sequelize?: Sequelize
    connection?: Connection
}


const initializeDB = async () => {
    const myDB: myDB = {}
    const { HOST, DB, USER, PASSWORD } = config;

    myDB.connection = await mysql.createConnection({ host: HOST, user: USER, password: PASSWORD });

    await myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);


    myDB.sequelize = new Sequelize(DB, USER, PASSWORD, { dialect: 'mysql', host: HOST, });


    userInit(myDB.sequelize);

    await myDB.sequelize.sync()

    return myDB;
}



const endDB = async (db: myDB) => {
    if (db.sequelize) {
        await db.sequelize.close();
    }
    if (db.connection) {
        await db.connection.end();
    }
}

export { initializeDB, endDB };

