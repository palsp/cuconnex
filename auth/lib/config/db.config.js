"use strict";
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "testdb",
    MODELS: [],
    dialect: "postgres",
    //Sequelize Pool config
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
    }
};
