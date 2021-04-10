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
exports.getUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("@cuconnex/common");
const middlewares_1 = require("../../middlewares");
const models_1 = require("../../models/");
const router = express_1.default.Router();
exports.getUserRouter = router;
router.get('/api/users/view-profile/:userId', middlewares_1.requireUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(req.params.userId);
    if (!user) {
        throw new common_1.NotFoundError();
    }
    const interests = yield models_1.UserInterest.findAll({ where: { userId: user.id } });
    if (!interests) {
        console.log(interests);
    }
    const status = yield user.findRelation(req.user.id);
    return res.status(200).send({ id: user.id, name: user.name, interests, status });
}));
router.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.redirect('/userInfo');
    }
    const interests = yield req.user.getInterests({ attributes: ['description'] });
    res.status(200).send({ id: req.user.id, name: req.user.name, interests });
}));
