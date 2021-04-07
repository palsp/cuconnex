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


    myDB.sequelize = new Sequelize(DB!, USER!, PASSWORD, { dialect: 'mysql', host: HOST, });

    //User waits until a new database is created before initializing it's models
    userInit(myDB.sequelize);

    await myDB.sequelize.sync()

    return myDB;
}


//Close database connection
const endDB = async (db: myDB) => {
    if (db.sequelize) {
        await db.sequelize.close();
    }
    if (db.connection) {
        await db.connection.end();
    }
}

export { initializeDB, endDB };

