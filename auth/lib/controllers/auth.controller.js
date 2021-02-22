"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const models_1 = require("../models");
const auth_config_1 = require("../config/auth.config");
const Sequelize = __importStar(require("sequelize"));
const User = models_1.db.user;
const Role = models_1.db.role;
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //bcrypt used to encrypt password
exports.signUp = (req, res) => {
    User.create({
        studentId: req.body.studentId,
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then((user) => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then((roles) => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User registered successfully" });
                });
            });
        }
        else {
            //Else set the user's role to user
            user.setRoles([1]).then(() => {
                res.send({ message: "User registered successfully" });
            });
        }
    })
        .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
exports.signIn = (req, res) => {
    User.findOne({
        where: {
            //change back to username
            email: req.body.email
        }
    })
        .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        //Send this back
        var token = jwt.sign({ id: user.studentId }, auth_config_1.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({ token: token });
    })
        .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
