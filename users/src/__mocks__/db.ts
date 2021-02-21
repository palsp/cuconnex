import { Sequelize } from 'sequelize';
import { test_config as config } from '../config/db.config';
import mysql, { Connection } from 'mysql2/promise';
import { initModel } from '../models'
import { randomBytes } from 'crypto'


interface myDB {
    sequelize?: Sequelize
    connection?: Connection
}


const initializeDB = async () => {
    const myDB: myDB = {}
    const { host, user, password } = config;
    console.log(config);
    const database = randomBytes(4).toString('hex');
    try {
        // create db if not exists
        myDB.connection = await mysql.createConnection({ host, user, password });
        await myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

        // connect to sequelize 
        myDB.sequelize = new Sequelize(database, user!, password, { dialect: 'mysql', logging: false });

        // initialize model
        initModel(myDB.sequelize);


        await myDB.sequelize.sync()

        return myDB;
    } catch (err) {
        throw new Error('Initialize database failed')
    }

}



const endDB = async (db: myDB) => {
    if (db.sequelize) await db.sequelize.close();
    if (db.connection) await db.connection.end();
}

export { initializeDB, endDB };

