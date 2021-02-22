import { db } from "../models";
import { Request, Response } from 'express';
import * as config from '../config/auth.config';
import * as Sequelize from 'sequelize';
const User = db.user;
const Role = db.role;
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //bcrypt used to encrypt password

export const signUp = (req: Request, res: Response ) => {
    User.create({
        studentId: req.body.studentId,
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then((user) => {
            if(req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully"})
                    });
                })
            } else {
                //Else set the user's role to user
                user.setRoles([1]).then(() => {
                    res.send({ message: "User registered successfully" })
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

export const signIn = (req: Request, res: Response) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.studentId }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities: string[] = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_"+ roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    studentId: user.studentId,
                    name: user.name,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}