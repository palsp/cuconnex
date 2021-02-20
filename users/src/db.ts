import { Sequelize } from 'sequelize';
import config from './config/db.config';
import mysql from 'mysql2/promise';
import { initModel } from './models'

const { host, db: database, user, password } = config;


const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });


const initializeDB = async () => {
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);


    initModel(sequelize);

    await sequelize.sync()
}

export { sequelize, initializeDB };

