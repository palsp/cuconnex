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
exports.memberStatusRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const requireUser_1 = require("../middlewares/requireUser");
const common_1 = require("@cuconnex/common");
const router = express_1.default.Router();
exports.memberStatusRouter = router;
/**
 * Uses express-validator to check for validity of the `targetUserId`, `teamName`, and `status` fields of the request object
 *
 */
const bodyChecker = [
    express_validator_1.body('targetUserId')
        .notEmpty()
        .isAlphanumeric(),
    express_validator_1.body('teamName')
        .notEmpty()
        .isAlphanumeric(),
    express_validator_1.body('status').notEmpty()
];
// change status to approve / reject by creator of the team
router.post('/api/members/status', bodyChecker, common_1.validateRequest, requireUser_1.requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetUserId, teamName, status } = req.body;
    try {
        const team = yield models_1.Team.findOne({ where: { name: teamName } });
        const targetUser = yield models_1.User.findOne({ where: { id: targetUserId } });
        if (!team) {
            throw new common_1.BadRequestError('Team not found!');
        }
        else if (!targetUser) {
            throw new common_1.BadRequestError('User not found!');
        }
        else if (team.creatorId !== req.user.id) {
            throw new common_1.BadRequestError('You are not the team creator!');
        }
        const member = yield models_1.Member.findOne({ where: { teamName, userId: targetUserId } });
        if (!member) {
            throw new common_1.BadRequestError(`Status for ${targetUserId} and ${teamName} not found!`);
        }
        const oldStatus = member.status;
        member.status = status;
        member.save();
        res
            .status(200)
            .send({ message: `Change status of ${targetUserId} from ${oldStatus} to ${status}` });
    }
    catch (err) {
        next(err);
    }
}));
