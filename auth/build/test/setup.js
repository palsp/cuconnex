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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../routes/app");
jest.mock('../db');
let testDB;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = 'asdfasdfaf';
    // create db if doesn't already existed
    try {
        testDB = yield db_1.initializeDB();
    }
    catch (err) {
        throw new Error('Initialized databae failed');
    }
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const models = Object.values(testDB.sequelize.models);
    for (let model of models) {
        yield model.destroy({ where: {} });
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.endDB(testDB);
}));
global.signup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'test@test.com';
    const password = 'password';
    const response = yield supertest_1.default(app_1.app)
        .post('/api/auth/signup')
        .send({
        id: id || "613776621",
        email,
        password
    })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
});
