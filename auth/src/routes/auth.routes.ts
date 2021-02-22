import { verifySignUp } from '../middleware';
import { signUp, signIn } from '../controllers/auth.controller';

export function authRoutes(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateStudentIdOrEmail,
            verifySignUp.checkRolesExisted
        ],
        signUp
    );

    app.post("/api/auth/signin", signIn);
};