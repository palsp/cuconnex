import { verifySignUp } from '../middleware';
import { signUp, signIn } from '../controllers/auth.controller';
import express, { Request, Response } from 'express';


export const authRoutes = express.Router();
authRoutes.use(function (req: Request, res: Response, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRoutes.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    signUp
);

authRoutes.post("/signin", signIn);
