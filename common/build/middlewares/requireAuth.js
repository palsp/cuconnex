"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        // throw new NotAuthorizedError()
        return res.status(401).send({
            errors: [{ message: "User not found in require Auth" }]
        });
    }
    next();
};
exports.requireAuth = requireAuth;
