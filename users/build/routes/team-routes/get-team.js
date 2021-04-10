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
exports.getTeamRouter = void 0;
const express_1 = __importDefault(require("express"));
const team_model_1 = require("../../models/team.model");
const common_1 = require("@cuconnex/common");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.getTeamRouter = router;
const bodyChecker = [
    express_validator_1.body('name')
        .notEmpty()
        .isAlphanumeric()
];
router.get('/api/teams', bodyChecker, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const team = yield team_model_1.Team.findOne({ where: { name } });
    if (!team) {
        throw new common_1.BadRequestError('Team not found!');
    }
    res.status(200).send({ team: team });
}));
