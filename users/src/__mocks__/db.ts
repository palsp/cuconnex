// import { Sequelize } from 'sequelize';
// import { test_config } from '../config/db.config'


// export const sequelize = new Sequelize(test_config.db, test_config.user, test_config.password, {
//     host: test_config.host,
//     dialect: "mysql",
//     logging: false,
// })

import { Sequelize } from 'sequelize';
import { test_config as config } from '../config/db.config';
import mysql from 'mysql2/promise';
import { initModel } from '../models';
import { randomBytes } from 'crypto'

const { host, user, password } = config;

const database = randomBytes(4).toString('utf-8');

const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', logging: false });


const initializeDB = async () => {

    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);


    initModel(sequelize);

    await sequelize.sync()
}

export { sequelize, initializeDB };

