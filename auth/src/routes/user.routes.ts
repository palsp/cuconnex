import { authJwt } from '../middleware'
import userController from '../controllers/user.controller';
import express, { Request, Response } from "express";

//Define express router
export const userRoutes = express.Router();


userRoutes.use(function (req: Request, res: Response, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

userRoutes.get("/all", (req: Request, res: Response) => {
    res.status(200).send("All content");
});

userRoutes.get("/user", [authJwt.verifyToken] ,userController.userBoard);


// userRoutes.get(
//     "/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     userController.adminBoard
// );
