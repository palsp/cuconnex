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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const common_1 = require("@cuconnex/common");
const user_model_1 = require("../models/user.model");
/**
 * A middleware function used to fetch user data from MySQL.
 *
 * First checks if the request object's `currentUser` field is defined.
 * If so then fetch the user's information from the database and stores it in `req.user`
 * @throws {NotAuthorizedError} if `req.currentUser` does not exist or is otherwise undefined
 *
 */
const fetchUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.currentUser) {
        throw new common_1.NotAuthorizedError();
    }
    try {
        const user = yield user_model_1.User.findByPk(req.currentUser.id);
        req.user = user;
    }
    catch (err) { }
    next();
});
exports.fetchUser = fetchUser;
