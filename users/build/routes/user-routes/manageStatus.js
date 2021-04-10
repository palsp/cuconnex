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
exports.manageStatusRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const requireUser_1 = require("../../middlewares/requireUser");
const common_1 = require("@cuconnex/common");
const models_1 = require("../../models");
const router = express_1.default.Router();
exports.manageStatusRouter = router;
const bodyChecker = [
    express_validator_1.body('teamName').notEmpty().isAlphanumeric(),
    express_validator_1.body('newStatusFromUser').notEmpty(),
];
router.post('/api/users/invitation', requireUser_1.requireUser, bodyChecker, common_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { teamName, newStatusFromUser } = req.body;
    try {
        const team = yield models_1.Team.findOne({ where: { name: teamName } });
        if (!team) {
            throw new common_1.BadRequestError('Team not found');
        }
        const member = yield models_1.Member.findOne({ where: { userId: user.id, teamName } });
        if (!member) {
            throw new common_1.BadRequestError(`User is not yet have a status with ${team.name} team.`);
        }
        const oldStatus = member.status;
        if (oldStatus !== common_1.TeamStatus.Pending) {
            throw new common_1.BadRequestError('This user has no pending status with this team.');
        }
        if (newStatusFromUser === common_1.TeamStatus.Pending) {
            throw new common_1.BadRequestError('New status from the user should be Accepted or Rejected.');
        }
        member.status = newStatusFromUser;
        const check = yield member.save();
        res
            .status(200)
            .send({ message: `Invitation from ${team.name} to ${user.name} is ${newStatusFromUser}.` });
    }
    catch (err) {
        next(err);
    }
}));
