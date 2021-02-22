"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const models_1 = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = models_1.db.user;
//Verify if jwt token send is valid or not
const verifyToken = (jwtToken) => {
    let token = jwtToken;
    let userId = "";
    if (!token) {
        return "No token provided!";
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return "Unauthorized";
        }
        userId = decoded.id;
        isAdmin(userId);
    });
};
//Checks if the user is an admin
const isAdmin = (userId) => {
    User.findByPk(userId).then(user => {
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
