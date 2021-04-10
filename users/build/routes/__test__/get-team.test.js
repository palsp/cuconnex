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
describe('Get Team Test', () => {
    it('should return "Team not found!" if team is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = '1';
        const res = yield supertest_1.default(app_1.app)
            .get('/api/teams')
            .set('Cookie', global.signin(id))
            .send({ name: 'notExsitingTeam' })
            .expect(400);
        const error = res.body.errors[0];
        expect(error.message).toEqual('Team not found!');
    }));
    it('should return team detail if it is found', () => __awaiter(void 0, void 0, void 0, function* () {
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
            .get('/api/teams')
            .set('Cookie', global.signin(user.id))
            .send({ name: team.name })
            .expect(200);
        expect(res.body.team.name).toEqual(team.name);
        expect(res.body.team.creatorId).toEqual(user.id);
    }));
});
