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
describe('Add member to Team --- Requesting', () => {
    it('should return 401 if user is not logged in yet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/request')
            .send({
            teamName: 'Team1'
        })
            .expect(401);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Not Authorized');
    }));
    it('should return 400 if user is not yet fill in the information detail.', () => __awaiter(void 0, void 0, void 0, function* () {
        // const user1 = await User.create({
        //   id: '6131886621',
        //   name: 'pal'
        // });
        const user2 = yield user_model_1.User.create({
            id: '6131776621',
            name: 'bob'
        });
        // const interest = await Interest.findOne({
        //   where: { description: InterestDescription.Business }
        // });
        // await user1.addInterest(interest!);
        // await user1.createTeams({ name: 'Team1', description: '' });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/request')
            .set('Cookie', global.signin())
            .send({
            teamName: 'Team1'
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Please fill the information form first.');
    }));
    it('should return 401 if team is not found.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        // await user1.createInterest({ description: InterestDescription.Business });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        yield user.createTeams({ name: 'Team1', description: '' });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/request')
            .set('Cookie', global.signin(user.id))
            .send({
            teamName: 'Team2'
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Team not found!');
    }));
    it('should return 400 if member status is already there.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        // await user1.createInterest({ description: InterestDescription.Business });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        const team = yield user.createTeams({ name: 'Team1', description: '' });
        const member = yield member_model_1.Member.create({
            teamName: 'Team1',
            userId: user.id,
            status: common_2.TeamStatus.Accept
        });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/request')
            .set('Cookie', global.signin(user.id))
            .send({
            teamName: team.name
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual(`This user already have status: ${member.status}`);
    }));
    it('should return 200 if user request pending to a team successfully.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user.addInterest(interest);
        const team = yield user.createTeams({ name: 'Team1', description: '' });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/request')
            .set('Cookie', global.signin(user.id))
            .send({
            teamName: 'Team1'
        })
            .expect(201);
        expect(res.body.message).toEqual('Request pending');
        expect(res.body.member).toEqual({ userId: user.id, teamName: team.name, status: 'Pending' });
    }));
});
describe('Add member to Team --- Invitation', () => {
    it('should return 401 if user is not logged in yet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .send({
            teamName: 'Team1',
            newMemberId: '9999'
        })
            .expect(401);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Not Authorized');
    }));
    it('should return 400 if user is not yet fill in information detail.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const team = yield user1.createTeams({ name: 'Team1', description: '' });
        const status = yield member_model_1.Member.create({
            userId: user1.id,
            teamName: team.name,
            status: common_2.TeamStatus.Accept
        });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .set('Cookie', global.signin())
            .send({
            teamName: 'Team1',
            newMemberId: user2.id
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Please fill the information form first.');
    }));
    it('should return 401 if team is not found.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        // await user1.createInterest({ description: InterestDescription.Business });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        yield user1.createTeams({ name: 'Team1', description: '' });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        // await user2.createInterest({ description: InterestDescription.Business });
        yield user2.addInterest(interest);
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team2',
            newMemberId: user2.id
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Team not found!');
    }));
    it('should return 400 if member status is already there.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        yield user1.createTeams({ name: 'Team1', description: '' });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        yield user2.addInterest(interest);
        const member1 = yield member_model_1.Member.create({
            teamName: 'Team1',
            userId: user1.id,
            status: common_2.TeamStatus.Accept
        });
        const member2 = yield member_model_1.Member.create({
            teamName: 'Team1',
            userId: user2.id,
            status: common_2.TeamStatus.Accept
        });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team1',
            newMemberId: user2.id
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual(`This user already have status: ${member2.status}`);
    }));
    it('should return 400 if the inviter is not a member of the team.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        yield user1.createTeams({ name: 'Team1', description: '' });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        yield user2.addInterest(interest);
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team1',
            newMemberId: user2.id
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('The inviter is not a team member.');
    }));
    it('should return 400 if the inviter is not a yet a member of the team but having pending status.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        yield user1.createTeams({ name: 'Team1', description: '' });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        yield user2.addInterest(interest);
        const member1 = yield member_model_1.Member.create({
            teamName: 'Team1',
            userId: user1.id,
            status: common_2.TeamStatus.Pending
        });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team1',
            newMemberId: user2.id
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('The inviter is not yet a team member.');
    }));
    it('should return 201 if invite successfully.', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const team = yield user1.createTeams({ name: 'Team1', description: '' });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        yield user2.addInterest(interest);
        const member1 = yield member_model_1.Member.create({
            teamName: 'Team1',
            userId: user1.id,
            status: common_2.TeamStatus.Accept
        });
        const res = yield supertest_1.default(app_1.app)
            .post('/api/members/invite')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team1',
            newMemberId: user2.id
        })
            .expect(201);
        expect(res.body.message).toEqual('Invite pending');
        expect(res.body.userId).toEqual(user2.id);
        expect(res.body.team).toEqual(team.name);
    }));
});
