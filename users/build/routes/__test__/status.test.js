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
const common_2 = require("@cuconnex/common");
const interest_model_1 = require("../../models/interest.model");
describe('Status Changing Test', () => {
    it('should return 400 if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131778821',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        yield user1.createTeams({ name: 'Team1', description: '' });
        yield member_model_1.Member.create({ userId: user1.id, teamName: 'Team1', status: common_2.TeamStatus.Accept });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/status')
            .set('Cookie', global.signin(user1.id))
            .send({
            targetUserId: '2',
            teamName: 'Team1',
            status: 'Accept'
        })
            .expect(400);
        expect(res.body.errors[0].message).toEqual('User not found!');
    }));
    it('should return 400 if team is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131778821',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/status')
            .set('Cookie', global.signin(user1.id))
            .send({
            targetUserId: '2',
            teamName: 'Team1',
            status: 'Accept'
        })
            .expect(400);
        expect(res.body.errors[0].message).toEqual('Team not found!');
    }));
    it('should return 400 if the requester is not the team creator', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131778821',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const team = yield user1.createTeams({ name: 'Team1', description: '' });
        yield member_model_1.Member.create({ userId: user1.id, teamName: 'Team1', status: common_2.TeamStatus.Accept });
        const user2 = yield user_model_1.User.create({
            id: '6131778822',
            name: 'pal2'
        });
        yield user2.addInterest(interest);
        yield member_model_1.Member.create({ userId: user2.id, teamName: 'Team1', status: common_2.TeamStatus.Accept });
        const user3 = yield user_model_1.User.create({
            id: '6131778823',
            name: 'pal3'
        });
        yield user3.addInterest(interest);
        yield member_model_1.Member.create({ userId: user3.id, teamName: 'Team1', status: common_2.TeamStatus.Pending });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/status')
            .set('Cookie', global.signin(user2.id))
            .send({
            targetUserId: user3.id,
            teamName: 'Team1',
            status: 'Accept'
        })
            .expect(400);
        expect(res.body.errors[0].message).toEqual('You are not the team creator!');
    }));
    it('should return 400 if the targetId is not yet pending request.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131778821',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const team = yield user1.createTeams({ name: 'Team1', description: '' });
        yield member_model_1.Member.create({ userId: user1.id, teamName: 'Team1', status: common_2.TeamStatus.Accept });
        const user3 = yield user_model_1.User.create({
            id: '6131778823',
            name: 'pal3'
        });
        yield user3.addInterest(interest);
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/status')
            .set('Cookie', global.signin(user1.id))
            .send({
            targetUserId: user3.id,
            teamName: 'Team1',
            status: 'Accept'
        })
            .expect(400);
        expect(res.body.errors[0].message).toEqual(`Status for ${user3.id} and ${team.name} not found!`);
    }));
    it('should return 200 if the creator can change status successfully.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131778821',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const team = yield user1.createTeams({ name: 'Team1', description: '' });
        yield member_model_1.Member.create({ userId: user1.id, teamName: 'Team1', status: common_2.TeamStatus.Accept });
        const user3 = yield user_model_1.User.create({
            id: '6131778823',
            name: 'pal3'
        });
        yield user3.addInterest(interest);
        const oldStatus = yield member_model_1.Member.create({
            userId: user3.id,
            teamName: 'Team1',
            status: common_2.TeamStatus.Pending
        });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/status')
            .set('Cookie', global.signin(user1.id))
            .send({
            targetUserId: user3.id,
            teamName: 'Team1',
            status: 'Accept'
        })
            .expect(200);
        expect(res.body.message).toEqual(`Change status of ${user3.id} from ${oldStatus.status} to Accept`);
    }));
});
