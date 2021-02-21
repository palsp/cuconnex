import { Sequelize } from 'sequelize';
import config from './config/db.config';
import mysql, { Connection } from 'mysql2/promise';
import { initModel } from './models'


interface myDB {
    sequelize?: Sequelize
    connection?: Connection
}


const initializeDB = async () => {
    const myDB: myDB = {}
    const { host, db: database, user, password } = config;


    myDB.connection = await mysql.createConnection({ host: host, user, password });

    await myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);


    myDB.sequelize = new Sequelize(database!, user!, password, { dialect: 'mysql', host, });



    initModel(myDB.sequelize);

    await myDB.sequelize.sync()

    return myDB;
}



const endDB = async (db: myDB) => {
    if (db.connection) await db.connection.end();
    if (db.sequelize) await db.sequelize.close();
}

export { initializeDB, endDB };

