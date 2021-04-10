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
describe('Get Members', () => {
    it('should return "Team not found! if team is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const res = yield supertest_1.default(app_1.app)
            .get('/api/members')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team1'
        })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Team not found!');
    }));
    it('should return 200: member status detail if get member correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield user_model_1.User.create({
            id: '6131886621',
            name: 'pal'
        });
        const interest = yield interest_model_1.Interest.findOne({
            where: { description: common_1.Business.BusinessCase }
        });
        yield user1.addInterest(interest);
        const team = yield user1.createTeams({ name: 'Team1', description: '' });
        yield member_model_1.Member.create({ userId: user1.id, teamName: 'Team1', status: common_2.TeamStatus.Accept });
        const user2 = yield user_model_1.User.create({
            id: '6131886622',
            name: 'pal2'
        });
        yield user2.addInterest(interest);
        yield member_model_1.Member.create({ userId: user2.id, teamName: 'Team1', status: common_2.TeamStatus.Pending });
        const res = yield supertest_1.default(app_1.app)
            .get('/api/members')
            .set('Cookie', global.signin(user1.id))
            .send({
            teamName: 'Team1'
        })
            .expect(200);
        expect(res.body.message).toEqual(`Getting members of ${team.name}`);
        expect(res.body.members[0]).toEqual({
            teamName: team.name,
            userId: user1.id,
            status: 'Accept'
        });
        expect(res.body.members[1]).toEqual({
            teamName: team.name,
            userId: user2.id,
            status: 'Pending'
        });
    }));
});
