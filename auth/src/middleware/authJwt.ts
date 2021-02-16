import { db } from '../models';
import { Request, Response } from 'express';
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const User = db.user;

//Verify if jwt token send is valid or not
const verifyToken = (req: Request, res: Response, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        res.userId = decoded.id;
        next();
    });
};

// //Checks if the user is an admin
// const isAdmin = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//         user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//                 if (roles[i].name === "admin") {
//                     next();
//                     return;
//                 }
//             }

//             res.status(403).send({
//                 message: "Require Admin Role!"
//             });
//             return;
//         });
//     });
// };

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

export const authJwt = {
    verifyToken: verifyToken
};
