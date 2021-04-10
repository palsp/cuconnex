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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./db");
const initDB_1 = require("./models/initDB");
const validateEnvAttr = () => {
    if (!process.env.DB_HOST) {
        throw new Error('DB_HOST must be defined');
    }
    if (!process.env.DB_USER) {
        throw new Error('DB_USER must be defined');
    }
    if (!process.env.DB_SCHEMA) {
        throw new Error('DB_SCHEMA must be defined');
    }
    if (!process.env.DB_SCHEMA) {
        throw new Error('DB_SCHEMA must be defined');
    }
    if (!process.env.DB_PASSWORD) {
        throw new Error('DB_PASSWORD must be defined');
    }
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // validateEnvAttr();
    try {
        // check if all required env variable have been declared
        yield db_1.initializeDB();
        // initial data for interest and category 
        yield initDB_1.startDB();
    }
    catch (err) {
        console.log(err);
    }
    console.log(__dirname);
    app_1.app.listen(3000, () => {
        console.log('Listening on port 3000....');
    });
});
start();
