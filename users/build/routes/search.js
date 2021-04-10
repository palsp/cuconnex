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
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.searchRouter = router;
const MAX_SEARCH = 11;
router.get('/api/users/general/:search', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.params.search;
    const userConstraint = [{ name: { [sequelize_1.Op.startsWith]: keyword } }, { id: { [sequelize_1.Op.startsWith]: keyword } }];
    /**
     * TODO: add role and lookingformember keyword for team search
     */
    const teamConstraint = { name: { [sequelize_1.Op.startsWith]: keyword } };
    let users;
    let team;
    try {
        users = yield models_1.User.findAll({ where: { [sequelize_1.Op.or]: userConstraint } });
        team = yield models_1.Team.findAll({ where: teamConstraint });
    }
    catch (err) {
        console.log(err);
    }
    res.status(200).send({
        users,
        team
    });
}));
router.get('/api/users/:search', middlewares_1.requireUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const constraints = [{ name: { [sequelize_1.Op.startsWith]: req.params.search } }, { id: req.params.search }];
    let users = yield models_1.User.findAll({
        where: {
            [sequelize_1.Op.or]: constraints
        },
        include: { association: 'interests', attributes: ['description'] }
    });
    if (users.length > MAX_SEARCH) {
        users = users.slice(0, MAX_SEARCH);
    }
    // sort by length from min > max
    users.sort((a, b) => a.name.length - b.name.length);
    // send back only name interest and ...
    res.status(200).send(users);
}));
router.get('/api/teams/:search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let teams = yield models_1.Team.findAll({
        where: { name: { [sequelize_1.Op.startsWith]: req.params.search } }
    });
    if (teams.length > MAX_SEARCH) {
        teams = teams.slice(0, MAX_SEARCH);
    }
    // sort by length from min > max
    teams.sort((a, b) => a.name.length - b.name.length);
    res.status(200).send(teams);
}));
