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
const app_1 = require("./routes/app");
const db_1 = require("./db");
const port = process.env.PORT || 3000;
const validateEnvVar = () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY nust be defined');
    }
    if (!process.env.DB_HOST) {
        throw new Error('DB_HOST must be defined');
    }
    if (!process.env.DB_USER) {
        throw new Error('DB_USER must be defined');
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
    // validateEnvVar();
    try {
        yield db_1.initializeDB();
    }
    catch (err) {
        console.log(err);
    }
    app_1.app.listen(port, () => console.log(`App listening on port ${port}....`));
});
start();
