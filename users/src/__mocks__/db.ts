import { Sequelize } from 'sequelize';
import { test_config as config } from '../config/db.config';
import mysql, { Connection } from 'mysql2/promise';
import { initModel } from '../models'
import { randomBytes } from 'crypto'


interface myDB {
    sequelize?: Sequelize
    connection?: Connection
    dbName?: string;
}


const initializeDB = async () => {
    const myDB: myDB = {}
    const { host, user, password } = config;
    myDB.dbName = randomBytes(4).toString('hex');

    // create db if not exists
    myDB.connection = await mysql.createConnection({ host, user, password });
    await myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${myDB.dbName}\`;`);

    // connect to sequelize 
    myDB.sequelize = new Sequelize(myDB.dbName, user, password, { dialect: 'mysql', logging: false });

    // initialize model
    initModel(myDB.sequelize);


    await myDB.sequelize.sync()

    return myDB;

}



const endDB = async (db: myDB) => {
    if (db) {

        if (db.connection) {
            await db.connection.query(`DROP DATABASE  \`${db.dbName}\`;`);
            await db.connection.end();
        }
        if (db.sequelize) await db.sequelize.close();
    }
}

export { initializeDB, endDB };

