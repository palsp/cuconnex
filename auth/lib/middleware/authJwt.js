"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const models_1 = require("../models");
const auth_config_1 = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const User = models_1.db.user;
//Verify if jwt token send is valid or not
const verifyToken = (req, res, next) => {
    let token = req.headers['x-token-access'];
    let userId = "";
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, auth_config_1.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
//Checks if the user is an admin
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    return "isAdmin";
                }
            }
            return "Not an admin";
        });
    });
};
// const isModerator = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//         user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//                 if (roles[i].name === "moderator") {
//                     next();
//                     return;
//                 }
//             }
//             res.status(403).send({
//                 message: "Require Moderator Role!"
//             });
//         });
//     });
// };
// const isModeratorOrAdmin = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//         user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//                 if (roles[i].name === "moderator") {
//                     next();
//                     return;
//                 }
//                 if (roles[i].name === "admin") {
//                     next();
//                     return;
//                 }
//             }
//             res.status(403).send({
//                 message: "Require Moderator or Admin Role!"
//             });
//         });
//     });
// };
exports.authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
