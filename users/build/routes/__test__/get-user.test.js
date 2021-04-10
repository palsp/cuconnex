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
const interest_model_1 = require("../../models/interest.model");
/**
 *  its return user instance and interest instance
 */
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create({
        id: '6131778821',
        name: 'pal',
    });
    const interest = yield interest_model_1.Interest.findOne({
        where: { description: common_1.Business.BusinessCase },
    });
    yield user.addInterest(interest);
    return { user, interest };
});
describe('get current user', () => {
    it('should return 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield supertest_1.default(app_1.app).get('/api/users').send().expect(401);
        expect(body.errors[0].message).toEqual('Not Authorized');
    }));
    it('should redirect user to add information page if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const { headers } = yield supertest_1.default(app_1.app).get('/api/users').set('Cookie', global.signin()).send();
        expect(headers.location).not.toBeNull();
    }));
    it.todo('should redirect with specific url');
    it('should return user information if user already add information', () => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = yield setup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .get('/api/users')
            .set('Cookie', global.signin(user.id))
            .send()
            .expect(200);
        expect(res.id).toEqual(user.id);
        expect(res.name).toEqual(user.name);
    }));
    it('return user must include interests', () => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = yield setup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .get('/api/users')
            .set('Cookie', global.signin(user.id))
            .send()
            .expect(200);
        expect(res.id).toEqual(user.id);
        expect(res.name).toEqual(user.name);
        expect(res.interests).not.toBeNull();
        expect(res.interests[0].description).toEqual(common_1.Business.BusinessCase);
    }));
});
describe('view user profile', () => {
    it('should return 400 if user is not fill info', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .get('/api/users/view-profile/asfadfadfa')
            .set('Cookie', global.signin())
            .send({})
            .expect(400);
    }));
    it('should return 404 if profile of the given user is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = yield setup();
        yield supertest_1.default(app_1.app)
            .get('/api/users/view-profile/613177221')
            .set('Cookie', global.signin(user.id))
            .send({})
            .expect(404);
    }));
    it('should return user information with status null if user view his/her own profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = yield setup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/users/view-profile/${user.id}`)
            .set('Cookie', global.signin(user.id))
            .send({})
            .expect(200);
        expect(res.name).toEqual(user.name);
        expect(res.id).toEqual(user.id);
        expect(res.status).toBeNull();
    }));
    it('should return user information with status toBeDefined if they are not friend', () => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = yield setup();
        const someone = yield user_model_1.User.create({
            id: '6131778921',
            name: 'friend',
        });
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/users/view-profile/${someone.id}`)
            .set('Cookie', global.signin(user.id))
            .send({})
            .expect(200);
        expect(res.name).toEqual(someone.name);
        expect(res.id).toEqual(someone.id);
        expect(res.status).toEqual(common_1.FriendStatus.toBeDefined);
    }));
});
