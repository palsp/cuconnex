import { Sequelize } from 'sequelize';
import { userInit } from './models/user.model';
import { db_config as config } from './config/db.config'
import mysql, { Connection } from 'mysql2/promise'


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

