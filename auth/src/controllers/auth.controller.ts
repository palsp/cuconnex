import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { BadRequestError } from '@cuconnex/common'
import { Password } from '../services/password';
require('express-async-errors');

interface UserPayload {
    id: string,
}

//Finds if user with email exists, if yes throws error 
export const signUp = async (req: Request, res: Response) => {
    const { id, email, password } = req.body

    const existingUser = await User.findOne({ where: { id } }); //This works too because email is unique

    if (existingUser) throw new BadRequestError('User existed');


    let user: User;
    try {
        user = await User.create({
            id,
            email,
            password,
        });
    } catch (err) {
        throw new BadRequestError('Create User Failed')
    }

    const userPayload: UserPayload = {
        id: user.id,

    }

    const userJwt = jwt.sign(userPayload, process.env.JWT_KEY!); //Needs exclamation mark because typescript doesn't know if we already have a key

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);

};



export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) throw new BadRequestError('Invalid credentials');

    // console.log(existingUser.password);
    const isMatch = await Password.compare(existingUser.password, password);

    if (!isMatch) throw new BadRequestError('Invalid credentials');

    const userPayload: UserPayload = {
        id: existingUser.id,
    }

    const userJwt = jwt.sign(userPayload, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt,
    };

    res.status(200).send({ email: existingUser.email, id: existingUser.id });
};


export const signOut = async (req: Request, res: Response) => {
    req.session = null;

    res.send({});
}

