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
exports.getMemberRouter = void 0;
const express_1 = __importDefault(require("express"));
const models_1 = require("../../models");
const common_1 = require("@cuconnex/common");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.getMemberRouter = router;
const bodyChecker = [
    express_validator_1.body('teamName')
        .notEmpty()
        .isAlphanumeric()
];
// ดูรายชื่อคนในทีม
// get user(s) with member status of the team
router.get('/api/members', bodyChecker, common_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamName } = req.body;
    const team = yield models_1.Team.findOne({ where: { name: teamName } });
    if (!team) {
        throw new common_1.BadRequestError('Team not found!');
    }
    const members = yield models_1.Member.findAll({ where: { teamName } });
    let returnMembers = [];
    if (members) {
        returnMembers = members;
    }
    res.status(200).send({ message: `Getting members of ${teamName}`, members: returnMembers });
}));
