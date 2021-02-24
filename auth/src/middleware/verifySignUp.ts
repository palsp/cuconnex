// import { Request, Response } from 'express';
// import { db } from '../models';

// const ROLES = db.ROLES;
// const User = db.user;


// const checkDuplicateStudentIdOrEmail = (req: Request, res: Response, next) => {
//     // StudentId
//     User.findOne({
//         where: {
//             studentId: req.body.studentId
//         }
//     }).then(user => {
//         if (user) {
//             res.status(400).send({
//                 message: "Failed! Username is already in use!"
//             });
//             return;
//         }


//         // Email
//         User.findOne({
//             where: {
//                 email: req.body.email
//             }
//         }).then(user => {
//             if (user) {
//                 res.status(400).send({
//                     message: "Failed! Email is already in use!"
//                 });
//                 return;
//             }

//             next();
//         });
//     });
// };

// const checkRolesExisted = (req: Request, res: Response, next) => {
//     if (req.body.roles) {
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     message: "Failed! Role does not exist = " + req.body.roles[i]
//                 });
//                 return;
//             }
//         }
//     }

//     next();
// };

// export const verifySignUp = {
//     checkDuplicateStudentIdOrEmail: checkDuplicateStudentIdOrEmail,
//     checkRolesExisted: checkRolesExisted
// };

