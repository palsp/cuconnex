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
exports.addMemberRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const requireUser_1 = require("../../middlewares/requireUser");
const models_1 = require("../../models");
const common_1 = require("@cuconnex/common");
const router = express_1.default.Router();
exports.addMemberRouter = router;
const bodyChecker1 = [express_validator_1.body('teamName').notEmpty().isAlphanumeric()];
// a user request to join a team
router.post('/api/members/request', requireUser_1.requireUser, bodyChecker1, common_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { teamName } = req.body;
        const team = yield models_1.Team.findOne({ where: { name: teamName } });
        if (!team) {
            throw new common_1.BadRequestError('Team not found!');
        }
        const member = yield models_1.Member.findOne({ where: { teamName, userId: user.id } });
        // if there is a member status : 'accept || reject || pending ' do nothing
        if (member) {
            throw new common_1.BadRequestError('This user already have status: ' + member.status);
        }
        const newMember = yield models_1.Member.create({
            userId: user.id,
            teamName,
            status: common_1.TeamStatus.Pending,
        });
        res.status(201).send({ message: 'Request pending', member: newMember });
    }
    catch (err) {
        next(err);
    }
}));
const bodyChecker2 = [
    express_validator_1.body('teamName').notEmpty().isAlphanumeric(),
    express_validator_1.body('newMemberId').notEmpty().isAlphanumeric(),
];
// a team member can invite a user to join
router.post('/api/members/invite', requireUser_1.requireUser, bodyChecker2, common_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.user;
    const { teamName, newMemberId } = req.body;
    //Find if there is a user in the database with the id we want to invite, and if their exists a team to add.
    const receiver = yield models_1.User.findOne({ where: { id: newMemberId } });
    const team = yield models_1.Team.findOne({ where: { name: teamName } });
    if (!receiver) {
        throw new common_1.BadRequestError('User not found!');
        // else if มี receiver แต่ receiver not yet fill info.
    }
    else if (!team) {
        throw new common_1.BadRequestError('Team not found!');
    }
    const isInviterAMember = yield models_1.Member.findOne({ where: { teamName, userId: sender.id } });
    if (!isInviterAMember) {
        throw new common_1.BadRequestError('The inviter is not a team member.');
    }
    else if (isInviterAMember.status !== 'Accept') {
        throw new common_1.BadRequestError('The inviter is not yet a team member.');
    }
    const member = yield models_1.Member.findOne({ where: { userId: newMemberId, teamName } });
    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
        throw new common_1.BadRequestError('This user already have status: ' + member.status);
    }
    yield models_1.Member.create({ userId: newMemberId, teamName, status: common_1.TeamStatus.Pending });
    res.status(201).send({ message: 'Invite pending', userId: receiver.id, team: team.name });
}));
