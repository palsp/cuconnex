import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { BadRequestError } from '@cuconnex/common'
import { Password } from '../services/password';
require('express-async-errors');

interface UserPayload {
    sid: string,
}

export const signUp = async (req: Request, res: Response) => {
    const { sid, email, password } = req.body

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) throw new BadRequestError('User existed');


    const user = await User.create({
        sid,
        email,
        password,
    });

    const userPayload: UserPayload = {
        sid: user.sid,

    }

    const userJwt = jwt.sign(userPayload, process.env.JWT_KEY!);

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
        sid: existingUser.sid,
    }

    const userJwt = jwt.sign(userPayload, process.env.JWT_KEY!);

    console.log(isMatch);
    req.session = {
        jwt: userJwt,
    };

    res.status(200).send({ email: existingUser.email, sid: existingUser.sid });
};


// export const signUp = ( req: Request, res: Response ) => {
//     User.create({
//         studentId: req.body.studentId,
//         email: req.body.email,
//         name: req.body.name,
//         password: bcrypt.hashSync(req.body.password, 8)
//     })
//         .then((user) => {
//             if(req.body.roles) {
//                 Role.findAll({
//                     where: {
//                         name: {
//                             [Op.or]: req.body.roles
//                         }
//                     }
//                 }).then((roles) => {
//                     user.setRoles(roles).then(() => {
//                         res.send({ message: "User registered successfully"})
//                     });
//                 })
//             } else {
//                 //Else set the user's role to user
//                 user.setRoles([1]).then(() => {
//                     res.send({ message: "User registered successfully" })
//                 })
//             }
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// }

// export const signIn = ( req: Request, res: Response ) => {
//     User.findOne({
//         where: {
//             //change back to username
//             email: req.body.email
//         }
//     })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({ message: "User Not found." });
//             }

//             var passwordIsValid = bcrypt.compareSync(
//                 req.body.password,
//                 user.password
//             );

//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     accessToken: null,
//                     message: "Invalid Password!"
//                 });
//             }

//             //Send this back
//             //Change id to our primary key
//             var token = jwt.sign({ id: user.studentId }, secret, {
//                 expiresIn: 86400 // 24 hours
//             });
//             res.status(200).send({ token: token });
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// }