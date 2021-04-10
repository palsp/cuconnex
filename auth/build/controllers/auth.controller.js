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
exports.signOut = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const common_1 = require("@cuconnex/common");
const password_1 = require("../services/password");
require('express-async-errors');
//Finds if user with email exists, if yes throws error 
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, password } = req.body;
    const existingUser = yield user_model_1.default.findOne({ where: { email } }); //This works too because email is unique
    if (existingUser)
        throw new common_1.BadRequestError('User existed');
    const user = yield user_model_1.default.create({
        id,
        email,
        password,
    });
    const userPayload = {
        id: user.id,
    };
    const userJwt = jsonwebtoken_1.default.sign(userPayload, process.env.JWT_KEY); //Needs exclamation mark because typescript doesn't know if we already have a key
    req.session = {
        jwt: userJwt
    };
    res.status(201).send(user);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_model_1.default.findOne({ where: { email } });
    if (!existingUser)
        throw new common_1.BadRequestError('Invalid credentials');
    // console.log(existingUser.password);
    const isMatch = yield password_1.Password.compare(existingUser.password, password);
    if (!isMatch)
        throw new common_1.BadRequestError('Invalid credentials');
    const userPayload = {
        id: existingUser.id,
    };
    const userJwt = jsonwebtoken_1.default.sign(userPayload, process.env.JWT_KEY);
    req.session = {
        jwt: userJwt,
    };
    res.status(200).send({ email: existingUser.email, id: existingUser.id });
});
exports.signIn = signIn;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    res.send({});
});
exports.signOut = signOut;
