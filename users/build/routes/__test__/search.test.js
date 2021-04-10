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
const common_1 = require("@cuconnex/common");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const interest_model_1 = require("../../models/interest.model");
const user_model_1 = require("../../models/user.model");
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = yield user_model_1.User.create({
        id: '6131886621',
        name: 'pal'
    });
    const user2 = yield user_model_1.User.create({
        id: '6131776621',
        name: 'bob'
    });
    const user3 = yield user_model_1.User.create({
        id: '6131776631',
        name: 'palllllll'
    });
    const user4 = yield user_model_1.User.create({
        id: '6131e76631',
        name: 'palalcc'
    });
    return [user1, user2, user3, user4];
});
describe('Search Test', () => {
    it('should return 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .get(`/api/users/adsfafasfasdfa`)
            .send({})
            .expect(401);
    }));
    it('should return a corresponding user(s) for the given name sort by name length', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield setup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .get('/api/users/pal')
            .set('Cookie', global.signin(users[1].id))
            .send({});
        expect(res).toHaveLength(3);
        const transformed = res.map((user) => user.name);
        expect(transformed[0]).toEqual(users[0].name);
        expect(transformed[1]).toContain(users[3].name);
        expect(transformed[2]).toContain(users[2].name);
    }));
    it('should return a corresponding team(s) for the given name sort by name length', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        yield user.createTeams({ name: 'testTeam1', description: '' });
        yield user.createTeams({ name: 'testTeam2', description: '' });
        yield user.createTeams({ name: 'testTeam3', description: '' });
        yield user.createTeams({ name: 'Somsan Tech', description: '' });
        yield user.createTeams({ name: 'Super Mario', description: '' });
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/teams/testTeam`)
            .set('Cookie', global.signin(user.id))
            .send({});
        expect(res).toHaveLength(3);
        const transformed = res.map((team) => team.name);
        expect(transformed[0]).toEqual('testTeam1');
        expect(transformed[1]).toEqual('testTeam2');
        expect(transformed[2]).toEqual('testTeam3');
        // -----------------
        const { body: res2 } = yield supertest_1.default(app_1.app)
            .get(`/api/teams/s`)
            .set('Cookie', global.signin(user.id))
            .send({});
        expect(res2).toHaveLength(2);
        const transformed2 = res2.map((team) => team.name);
        expect(transformed2[0]).toEqual('Somsan Tech');
        expect(transformed2[1]).toEqual('Super Mario');
    }));
    it('should return a corresponding user(s) for the given id', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield setup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/users/${users[0].id}`)
            .set('Cookie', global.signin(users[1].id))
            .send({});
        expect(res).toHaveLength(1);
        expect(res[0].id).toEqual(users[0].id);
    }));
    // for user search
    it('should return empty array if the input params does not match any attribute in db', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield setup();
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/users/adfasdfasdfafds`)
            .set('Cookie', global.signin(users[0].id))
            .send({});
        expect(res).not.toBeNull();
        expect(res).toHaveLength(0);
    }));
    it('should include interest in the response', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield setup();
        // await user.createInterests({ description: InterestDescription.Developer });
        const interest = yield interest_model_1.Interest.findOne({
            where: {
                description: common_1.Technology.Coding,
            }
        });
        yield users[0].addInterest(interest);
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/users/${users[0].id}`)
            .set('Cookie', global.signin(users[0].id))
            .send({});
        expect(res[0].interests).toBeDefined();
        expect(res[0].interests[0].description).toEqual(common_1.Technology.Coding);
    }));
    it('should return a corresponding team(s) for the given name sort by name length', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        yield user.createTeams({ name: 'testTeam1', description: '' });
        yield user.createTeams({ name: 'testTeam2', description: '' });
        yield user.createTeams({ name: 'testTeam3', description: '' });
        yield user.createTeams({ name: 'Somsan Tech', description: '' });
        yield user.createTeams({ name: 'Super Mario', description: '' });
        const { body: res } = yield supertest_1.default(app_1.app)
            .get(`/api/teams/afasfasf`)
            .set('Cookie', global.signin(user.id))
            .send({});
        expect(res).not.toBeNull();
        expect(res).toHaveLength(0);
    }));
    it.todo('should send data in specific pattern');
});
describe('General Search', () => {
    it('retuens corresponding user matched with given name as a keyword', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = (yield setup());
        yield users[0].createTeams({ name: 'testTeam1', description: '' });
        yield users[0].createTeams({ name: 'testTeam2', description: '' });
        yield users[0].createTeams({ name: 'testTeam3', description: '' });
        const { body } = yield supertest_1.default(app_1.app)
            .get(`/api/users/general/${users[0].name}`)
            .set('Cookie', global.signin())
            .send({})
            .expect(200);
        expect(body.users).toHaveLength(3);
        expect(body.team).toHaveLength(0);
    }));
    it('retuens corresponding user matched with given id as a keyword', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = (yield setup());
        yield users[0].createTeams({ name: 'testTeam1', description: '' });
        yield users[0].createTeams({ name: 'testTeam2', description: '' });
        yield users[0].createTeams({ name: 'testTeam3', description: '' });
        const { body } = yield supertest_1.default(app_1.app)
            .get(`/api/users/general/${users[0].id}`)
            .set('Cookie', global.signin())
            .send({})
            .expect(200);
        expect(body.users).toHaveLength(1);
        expect(body.team).toHaveLength(0);
    }));
    it('retuens corresponding team matched with given keyword', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = (yield setup());
        yield users[0].createTeams({ name: 'testTeam1', description: '' });
        yield users[0].createTeams({ name: 'testTeam2', description: '' });
        yield users[0].createTeams({ name: 'testTeam3', description: '' });
        const { body } = yield supertest_1.default(app_1.app)
            .get(`/api/users/general/test`)
            .set('Cookie', global.signin())
            .send({})
            .expect(200);
        expect(body.users).toHaveLength(0);
        expect(body.team).toHaveLength(3);
    }));
    it('retuens corresponding user and team matched with given keyword', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = (yield setup());
        yield users[0].createTeams({ name: 'palteam1', description: '' });
        yield users[0].createTeams({ name: 'palteam2', description: '' });
        yield users[0].createTeams({ name: 'bobteam1', description: '' });
        const { body } = yield supertest_1.default(app_1.app)
            .get(`/api/users/general/${users[0].name}`)
            .set('Cookie', global.signin())
            .send({})
            .expect(200);
        expect(body.users).toHaveLength(3);
        expect(body.team).toHaveLength(2);
    }));
});
