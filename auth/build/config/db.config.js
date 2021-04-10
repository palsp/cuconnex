"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_config = exports.db_config = void 0;
exports.db_config = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_SCHEMA,
    MODELS: [],
    dialect: "mysql",
    //Sequelize Pool config
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
    }
};
exports.test_config = {
    host: "localhost",
    user: "root",
    password: "password",
    db: "test_db",
    MODELS: [],
    dialect: "mysql",
};
