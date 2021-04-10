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
const signup = () => __awaiter(void 0, void 0, void 0, function* () {
    const id = '6131776621';
    const email = 'test@test.com';
    const password = 'password';
    const response = yield supertest_1.default(app_1.app)
        .post('/api/auth/signup')
        .send({
        id,
        email,
        password
    })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return { cookie, email, password, id };
});
describe('Sign in test', () => {
    it('should return 400 if email is not supplied', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            password: "asdfasdfa"
        })
            .expect(400);
    }));
    it('should return 400 if email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email: 'asdfasfasdf',
            password: "asdfasdfa"
        })
            .expect(400);
    }));
    it('should return 400 if password is not supplied', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email: 'test@test.com',
        })
            .expect(400);
    }));
    it('should return 400 if email doesn not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email: 'test@test.com',
            password: "asdfasdfa"
        })
            .expect(400);
        expect(res.errors[0].message).toEqual('Invalid credentials');
    }));
    it('should return 400 if password is not matched', () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = yield signup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email,
            password: "asdfasdfa"
        })
            .expect(400);
    }));
    it('should signin user if password match', () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, id } = yield signup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email,
            password,
        })
            .expect(200);
        expect(res.email).toEqual(email);
        expect(res.id).toEqual(id);
    }));
    it('should not send user password with the response', () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, id } = yield signup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email,
            password,
        })
            .expect(200);
        expect(res.password).not.toBeDefined();
    }));
    it('should set cookie once successfully sign in', () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = yield signup();
        const res = yield supertest_1.default(app_1.app)
            .post('/api/auth/signin')
            .send({
            email,
            password,
        })
            .expect(200);
        expect(res.get('Set-Cookie')).toBeDefined();
    }));
});
