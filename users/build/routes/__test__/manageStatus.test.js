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
const member_model_1 = require("../../models/member.model");
const common_1 = require("@cuconnex/common");
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield user_model_1.User.create({
        id: '6131886621',
        name: 'pal',
    });
    const receiver = yield user_model_1.User.create({
        id: '6131776621',
        name: 'receiver',
    });
    return { sender, receiver };
});
// should check all IF-STATEMENT cases on /api/users/invitaion as well
// but lazy for now...
describe('User manages his/her connection(s) with teams', () => {
    it('should return 200 if a user can accept/reject his/her status correctly.', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        const team1 = yield sender.createTeams({ name: 'testTeam', description: '' });
        const team2 = yield sender.createTeams({ name: 'testTeam2', description: '' });
        const member1 = yield member_model_1.Member.create({
            userId: receiver.id,
            teamName: team1.name,
            status: common_1.TeamStatus.Pending,
        });
        const member2 = yield member_model_1.Member.create({
            userId: receiver.id,
            teamName: team2.name,
            status: common_1.TeamStatus.Pending,
        });
        yield supertest_1.default(app_1.app)
            .post('/api/users/invitation')
            .set('Cookie', global.signin(receiver.id))
            .send({ teamName: team1.name, newStatusFromUser: common_1.TeamStatus.Accept })
            .expect(200);
        const member1AfterChanged = yield member_model_1.Member.findOne({
            where: { userId: receiver.id, teamName: team1.name },
        });
        expect(member1AfterChanged.status).toEqual(common_1.TeamStatus.Accept);
        yield supertest_1.default(app_1.app)
            .post('/api/users/invitation')
            .set('Cookie', global.signin(receiver.id))
            .send({ teamName: team2.name, newStatusFromUser: common_1.TeamStatus.Reject })
            .expect(200);
        const member2AfterChanged = yield member_model_1.Member.findOne({
            where: { userId: receiver.id, teamName: team2.name },
        });
        expect(member2AfterChanged.status).toEqual(common_1.TeamStatus.Reject);
    }));
});
