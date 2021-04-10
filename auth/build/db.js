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
const user_model_1 = require("./models/user.model");
const db_config_1 = require("./config/db.config");
const promise_1 = __importDefault(require("mysql2/promise"));
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const myDB = {};
    const { HOST, DB, USER, PASSWORD } = db_config_1.db_config;
    myDB.connection = yield promise_1.default.createConnection({ host: HOST, user: USER, password: PASSWORD });
    yield myDB.connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);
    myDB.sequelize = new sequelize_1.Sequelize(DB, USER, PASSWORD, { dialect: 'mysql', host: HOST, });
    //User waits until a new database is created before initializing it's models
    user_model_1.userInit(myDB.sequelize);
    yield myDB.sequelize.sync();
    return myDB;
});
exports.initializeDB = initializeDB;
//Close database connection
const endDB = (db) => __awaiter(void 0, void 0, void 0, function* () {
    if (db.sequelize) {
        yield db.sequelize.close();
    }
    if (db.connection) {
        yield db.connection.end();
    }
});
exports.endDB = endDB;
