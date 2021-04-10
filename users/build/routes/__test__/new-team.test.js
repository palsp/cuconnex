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
const member_model_1 = require("../../models/member.model");
const user_model_1 = require("../../models/user.model");
const common_1 = require("@cuconnex/common");
const interest_model_1 = require("../../models/interest.model");
describe('Create a Team Test', () => {
    it('should return 400 if team name is already existed', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        const team = yield user.createTeams({ name: 'testTeam', description: '' });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/teams')
            .set('Cookie', global.signin(user.id))
            .send({
            name: 'testTeam'
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Team name already existed.');
    }));
    it('should return 401 if user is not authorized or user is not logged in.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        // await user.createInterest({ description: InterestDescription.Business });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        const team = yield user.createTeams({ name: 'testTeam', description: '' });
        // no global log in
        const res = yield supertest_1.default(app_1.app)
            .post('/api/teams')
            .send({ name: 'testTeam' })
            .expect(401);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Not Authorized');
    }));
    it('should return 400 if no the requested user does not fill in the information yet. ', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        // await user.createInterest({ description: InterestDescription.Business });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        const team = yield user.createTeams({ name: 'testTeam', description: '' });
        const id = '2';
        const res = yield supertest_1.default(app_1.app)
            .post('/api/teams')
            .set('Cookie', global.signin(id))
            .send({
            name: 'testTeam'
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Please fill the information form first.');
    }));
    it('should create team successfully if user is authorized and team name is unique.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        // await user.createInterest({ description: InterestDescription.Business });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        const team = yield user.createTeams({ name: 'testTeam', description: '' });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/teams')
            .set('Cookie', global.signin(user.id))
            .send({
            name: 'newTeam'
        })
            .expect(201);
        const status = yield member_model_1.Member.findAll({ where: { userId: user.id, teamName: 'newTeam' } });
        expect(status[0].userId).toEqual(user.id);
        expect(status[0].teamName).toEqual('newTeam');
        expect(status[0].status).toEqual(common_1.TeamStatus.Accept);
        expect(res.body.message).toEqual(`Create team successfully by ${user.id}.`);
        expect(res.body.creatorId).toEqual(user.id);
        expect(res.body.name).toEqual('newTeam');
        expect(res.body.name).toEqual('newTeam');
    }));
});
