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
exports.addFriendRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("@cuconnex/common");
const models_1 = require("../../models");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
exports.addFriendRouter = router;
const bodyChecker = [
    express_validator_1.body('userId')
        .notEmpty()
        .isAlphanumeric()
];
router.post('/api/users/add-friend', middlewares_1.requireUser, bodyChecker, common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addedUser = yield models_1.User.findUser(req.body.userId);
    yield req.user.requestConnection(addedUser);
    res.status(201).send({});
}));
router.post('/api/users/add-friend/result', middlewares_1.requireUser, [
    express_validator_1.body('userId')
        .notEmpty()
        .isAlphanumeric()
        .withMessage('User id is not valid'),
    express_validator_1.body('accepted')
        .notEmpty()
        .isBoolean()
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sendUser = yield models_1.User.findUser(req.body.userId);
    const status = yield req.user.acceptConnection(sendUser.id, req.body.accepted);
    res.status(201).send({ status });
}));
