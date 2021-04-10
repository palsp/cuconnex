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
describe('notification for a user', () => {
    it('should return 204 (no content) if there is no invitaion from any team', () => __awaiter(void 0, void 0, void 0, function* () {
        const { receiver } = yield setup();
        yield supertest_1.default(app_1.app)
            .get('/api/users/notification/invite')
            .set('Cookie', global.signin(receiver.id))
            .send()
            .expect(204);
    }));
    it('should get all invitaions from user if there is', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sender, receiver } = yield setup();
        const team1 = yield sender.createTeams({ name: 'testTeam', description: '' });
        const team2 = yield sender.createTeams({ name: 'testTeam2', description: '' });
        yield member_model_1.Member.create({ userId: receiver.id, teamName: team1.name, status: common_1.TeamStatus.Pending });
        yield member_model_1.Member.create({ userId: receiver.id, teamName: team2.name, status: common_1.TeamStatus.Pending });
        const res = yield supertest_1.default(app_1.app)
            .get('/api/users/notification/invite')
            .set('Cookie', global.signin(receiver.id))
            .send()
            .expect(200);
        expect(res.body.teams[0]).toEqual('testTeam');
        expect(res.body.teams[1]).toEqual('testTeam2');
    }));
});
