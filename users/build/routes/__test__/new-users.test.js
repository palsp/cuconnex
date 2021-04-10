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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const user_model_1 = require("../../models/user.model");
const common_1 = require("@cuconnex/common");
it('should return 400 if users send invalid type of interest list', () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post('/api/users')
        .set('Cookie', global.signin())
        .send({
        username: 'test',
        interests: common_1.InterestDescription.Business
    })
        .expect(400);
}));
it('should return 400 if user info already existed', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = '6131886621';
    const cookies = global.signin(id);
    yield user_model_1.User.create({
        id: '6131886621',
        name: 'pal'
    });
    const { body } = yield supertest_1.default(app_1.app)
        .post('/api/users')
        .set('Cookie', cookies)
        .send({
        name: 'test',
        interests: {
            Technology: [],
        }
    })
        .expect(400);
    expect(body.errors[0].message).toEqual('User already existed');
}));
it('should return 400 if users send interests list with invalid category field', () => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = yield supertest_1.default(app_1.app)
        .post('/api/users')
        .set('Cookie', global.signin())
        .send({
        name: 'test',
        interests: {
            invalid: [],
        }
    })
        .expect(400);
    expect(body.errors[0].message).toEqual('Valid interest must be provided');
}));
it('should return 400 if users send valid category name but value is not array', () => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = yield supertest_1.default(app_1.app)
        .post('/api/users')
        .set('Cookie', global.signin())
        .send({
        name: 'test',
        interests: {
            Technology: "Hello",
        }
    })
        .expect(400);
    expect(body.errors[0].message).toEqual('Valid interest must be provided');
}));
it('should return 401 if users is not login', () => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = yield supertest_1.default(app_1.app)
        .post('/api/users')
        .send({
        name: 'test',
        interests: {
            Technology: []
        }
    })
        .expect(401);
    expect(body.errors[0].message).toEqual('Not Authorized');
}));
it('should create a users with interests on valid input', () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.app)
        .post('/api/users')
        .set('Cookie', global.signin())
        .send({
        interests: {
            Technology: [common_1.Technology.Coding]
        },
        name: 'test',
    })
        .expect(201);
}));
it('should not save duplicate interest list', () => __awaiter(void 0, void 0, void 0, function* () {
    const { body: user } = yield supertest_1.default(app_1.app)
        .post('/api/users')
        .set('Cookie', global.signin())
        .send({
        interests: {
            Technology: [common_1.Technology.Coding, common_1.Technology.Coding]
        },
        name: 'test',
    })
        .expect(201);
    const currentUser = yield user_model_1.User.findOne({ where: { id: user.id } });
    expect(yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.getInterests())).toHaveLength(1);
}));
it.todo('add interest by category');
