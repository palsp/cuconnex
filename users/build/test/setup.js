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
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const initDB_1 = require("../models/initDB");
const types_1 = require("../models/types");
jest.mock('../db');
let testDB;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = 'asdfasdfaf';
    // create db if doesn't already existed
    try {
        testDB = yield db_1.initializeDB();
        yield initDB_1.startDB();
    }
    catch (err) {
        console.log(err);
        throw new Error('Initialized databae failed');
    }
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const models = Object.values(testDB.sequelize.models);
    for (let model of models) {
        if (model.tableName != types_1.TableName.interests && model.tableName != types_1.TableName.category) {
            yield model.destroy({ where: {} });
        }
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.endDB(testDB);
}));
global.signin = (id) => {
    // Build JWT payload { id , username }
    const payload = {
        id: id || '6131707021',
        username: 'birdgloveeiei'
    };
    // create the JWT
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
    // build session
    const session = { jwt: token };
    // Turn into json
    const sessionJSON = JSON.stringify(session);
    // Take JSON and turn into string base64( cookie )
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`express:sess=${base64}`];
};
