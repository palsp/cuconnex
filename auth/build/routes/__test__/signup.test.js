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
const app_1 = require("../app");
const supertest_1 = __importDefault(require("supertest"));
const user_model_1 = __importDefault(require("../../models/user.model"));
describe('Sign up test', () => {
    it('should return 400 if email is not supplied', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send({
            password: "adsfadfasd",
            id: "adsfasdfasdf"
        })
            .expect(400);
    }));
    it('should return 400 if email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: "adfadfa",
            password: "adsfadfasd",
            id: "adsfasdfasdf"
        })
            .expect(400);
    }));
    it('should return 400 if password is not supplied', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: "test@test.com",
            id: "adsfasdfasdf"
        })
            .expect(400);
    }));
    it('should return 400 if student id is not supplied', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: "test@test.com",
            password: "adsfadfasd",
        })
            .expect(400);
    }));
    it('should return 400 if email already existed', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_model_1.default.create({
            id: "6131886621",
            email: "test@test.com",
            password: "test",
        });
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send({
            email: "test@test.com",
            password: "adsfadfasd",
            id: "6131886621"
        })
            .expect(400);
        expect(res.errors[0].message).toEqual('User existed');
    }));
    it('should create user on valid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            email: "test@test.com",
            password: "adsfadfasd",
            id: "6131886621"
        };
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send(userInput)
            .expect(201);
        expect(res.email).toEqual(userInput.email);
        expect(res.id).toEqual(userInput.id);
        expect(res.password).not.toBeDefined();
    }));
    it('should set cookie once successfully sign up', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            email: "test@test.com",
            password: "adsfadfasd",
            id: "6131886621"
        };
        const res = yield supertest_1.default(app_1.app)
            .post('/api/auth/signup')
            .send(userInput)
            .expect(201);
        expect(res.get('Set-Cookie')).toBeDefined();
    }));
});
