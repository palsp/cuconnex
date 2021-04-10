"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endDB = exports.initializeDB = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("./config/db.config"));
const promise_1 = __importDefault(require("mysql2/promise"));
const models_1 = require("./models");
/** Initializes the database by starting a mySQL connection to the server and then instantiating a
 * new Sequelize instance.
 *
 *     The mySQL connection is stored in <strong>myDB.connection</strong>.
 *
 *     The Sequelize instance is stored in myDB.sequelize.
 *
 * @returns {myDB} myDB the database object that contains the sequelize instance and mysql connection
 */
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const myDB = {};
    const { host, db: database, user, password } = db_config_1.default;
    myDB.connection = yield promise_1.default.createConnection({ host: host, user, password });
    yield myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    myDB.sequelize = new sequelize_1.Sequelize(database, user, password, { dialect: 'mysql', host });
    models_1.autoMigrate(myDB.sequelize);
    yield myDB.sequelize.sync({ force: true });
    return myDB;
});
exports.initializeDB = initializeDB;
/**Call this function when you want to terminate the current sequelize connection.
 *
 * If a sequelize instance is present, close all connections used by this sequelize instance by calling Sequelize.close().
 *
 * Then, it checks if there is a mySQL connection, if yes then end all connections with Connection.end()
 *
 * @param {myDB} db The database Object
 */
const endDB = (db) => __awaiter(void 0, void 0, void 0, function* () {
    if (db.sequelize) {
        yield db.sequelize.close();
    }
    if (db.connection) {
        yield db.connection.end();
    }
});
exports.endDB = endDB;
