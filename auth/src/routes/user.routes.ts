import { authJwt } from '../middleware'
import { allAccess, userBoard, adminBoard } from '../controllers/user.controller';

export function userRoutes(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", allAccess);

    app.get("/api/test/user", [authJwt.verifyToken],userBoard);


    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        adminBoard
    );
};