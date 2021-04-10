"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const common_1 = require("@cuconnex/common");
/**
 * Checks for you if there is a req.user already.
 *
 * So if you call this middleware and it does not throw an error, then you can be 100% sure
 * that there is a user property on the req objects
 * @throws {BadRequestError} - If the req object does not have user attached to it
 *
 */
const requireUser = (req, res, next) => {
    if (!req.user) {
        throw new common_1.BadRequestError('Please fill the information form first.');
    }
    next();
};
exports.requireUser = requireUser;
