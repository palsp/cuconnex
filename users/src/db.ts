import { Sequelize } from 'sequelize';
import config from './config/db.config';
import mysql, { Connection } from 'mysql2/promise';
import { initModel } from './models';

interface myDB {
  sequelize?: Sequelize;
  connection?: Connection;
}

const initializeDB = async () => {
  const myDB: myDB = {};
  const { host, db: database, user, password } = config;

  myDB.connection = await mysql.createConnection({ host: host, user, password });

  await myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  myDB.sequelize = new Sequelize(database!, user!, password, { dialect: 'mysql', host });

  initModel(myDB.sequelize);

  await myDB.sequelize.sync({ force: true });

  return myDB;
};

/**Call this function when you want to terminate the current sequelize connection.
 * If a sequelize instance is present, close all connections used by this sequelize instance by calling Sequelize.close().
 * 
 * @param {myDB} db 
 */
const endDB = async (db: myDB) => {
  if (db.sequelize) {
    await db.sequelize.close();
  }
  if (db.connection) {
    await db.connection.end();
  }
};

export { initializeDB, endDB };
