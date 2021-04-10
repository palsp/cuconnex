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
const connection_model_1 = require("../../models/connection.model");
const common_1 = require("@cuconnex/common");
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield user_model_1.User.create({
        id: "6131886621",
        name: "pal"
    });
    const receiver = yield user_model_1.User.create({
        id: "6131776621",
        name: "receiver"
    });
    return { sender, receiver };
});
describe('sending friend request test ', () => {
    it(`should return 400 with 'Please fill the information form' if user does not fill info`, () => __awaiter(void 0, void 0, void 0, function* () {
        const receiver = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        const { body: res } = yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin())
            .send({ userId: receiver.id })
            .expect(400);
        expect(res.errors[0].message).toEqual('Please fill the information form first.');
    }));
    it(`should return 404  if user who is added does not exist`, () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender } = yield setup();
        yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin(sender.id))
            .send({ userId: 'adfasdfasfa' })
            .expect(404);
    }));
    it('should save added user in friend table with status "Pending" ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        const { body } = yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin(sender.id))
            .send({ userId: receiver.id });
        const relation = yield connection_model_1.Connection.findAll({ where: { senderId: sender.id, receiverId: receiver.id } });
        expect(relation).not.toBeNull();
        expect(relation).toHaveLength(1);
        expect(relation[0].status).toEqual(common_1.FriendStatus.Pending);
    }));
    it('not allows add friend if relation already exist (AB = BA)', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        yield sender.addConnection(receiver);
        yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin(receiver.id))
            .send({ userId: sender.id })
            .expect(201);
        const result = yield connection_model_1.Connection.findOne({
            where: { senderId: receiver.id, receiverId: sender.id }
        });
        expect(result).toBeNull();
    }));
});
describe(' accept friend request ', () => {
    it('should reject request (return 400) on invalid req parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        yield sender.addConnection(receiver);
        yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
            userId: sender.id,
            accepted: 'Hello'
        })
            .expect(400);
    }));
    it('should reject request if relation does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
            userId: sender.id,
            accepted: true
        })
            .expect(400);
    }));
    it('should update relation status on accepted', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        yield sender.addConnection(receiver);
        yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
            userId: sender.id,
            accepted: true
        })
            .expect(201);
        const relation = yield sender.findRelation(receiver.id);
        expect(relation).toEqual(common_1.FriendStatus.Accept);
    }));
    it('should update relation status on rejected', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        yield sender.addConnection(receiver);
        yield supertest_1.default(app_1.app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
            userId: sender.id,
            accepted: false
        })
            .expect(201);
        const relation = yield sender.findRelation(receiver.id);
        expect(relation).toEqual(common_1.FriendStatus.Reject);
    }));
});
