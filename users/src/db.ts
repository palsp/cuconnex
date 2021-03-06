import { Sequelize } from 'sequelize';
import config from './config/db.config';
import mysql, { Connection } from 'mysql2/promise';
import { autoMigrate } from './models';

interface myDB {
  sequelize?: Sequelize;
  connection?: Connection;
}

/** Initializes the database by starting a mySQL connection to the server and then instantiating a 
 * new Sequelize instance.
 * 
 *     The mySQL connection is stored in <strong>myDB.connection</strong>.
 * 
 *     The Sequelize instance is stored in myDB.sequelize.
 * 
 * @returns {myDB} myDB the database object that contains the sequelize instance and mysql connection
 */

const initializeDB = async () => {
  const myDB: myDB = {};
  const { host, db: database, user, password } = config;
  myDB.connection = await mysql.createConnection({ host: host, user, password });

  await myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  myDB.sequelize = new Sequelize(database!, user!, password, { dialect: 'mysql', host });

  autoMigrate(myDB.sequelize);

  await myDB.sequelize.sync({ logging: false});

  console.log('Successfully connected to database')

  return myDB;
};

/**Call this function when you want to terminate the current sequelize connection.
 * 
 * If a sequelize instance is present, close all connections used by this sequelize instance by calling Sequelize.close().
 * 
 * Then, it checks if there is a mySQL connection, if yes then end all connections with Connection.end()
 * 
 * @param {myDB} db The database Object
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
