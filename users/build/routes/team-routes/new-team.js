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
exports.newTeamRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const requireUser_1 = require("../../middlewares/requireUser");
const common_1 = require("@cuconnex/common");
const models_1 = require("../../models");
const common_2 = require("@cuconnex/common");
const router = express_1.default.Router();
exports.newTeamRouter = router;
const bodyChecker = [
    express_validator_1.body('name')
        .notEmpty()
        .isAlphanumeric()
];
// when user try to create a team
router.post('/api/teams', bodyChecker, common_2.validateRequest, requireUser_1.requireUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const user = req.user;
    try {
        const team = yield models_1.Team.findOne({ where: { name } });
        if (team) {
            throw new common_2.BadRequestError('Team name already existed.');
        }
        const newTeam = yield user.createTeams({ name, description });
        const status = yield models_1.Member.create({
            userId: user.id,
            teamName: name,
            status: common_1.TeamStatus.Accept
        });
        res.status(201).send({
            message: `Create team successfully by ${user.id}.`,
            creatorId: user.id,
            name: newTeam.name,
            status
        });
    }
    catch (err) {
        next(err);
        // throw new Error(err.message);
    }
}));
