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

}