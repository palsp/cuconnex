import express from 'express';
require('express-async-errors');
import session from 'cookie-session';
import { json, urlencoded } from 'body-parser';
import { currentUser, errorHandling, requireAuth, NotFoundError } from '@cuconnex/common';
import cors from 'cors';
import { fetchUser } from './middlewares';
import * as router from './routes';
import { connectionRouter, userRouter, teamRouter } from './routes';
require('./config/multer.config');

const app = express();

app.use(cors({
  allowedHeaders: 'Authorization',
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
}));
app.set('trust proxy', true);

app.use(json());
app.use(urlencoded({ extended: true, limit: "800mb" }));
app.use(cors());

app.use(
  session({
    signed: false,
    secure: false,
  })
);
/*TODO: uncomment these three lines after development */
app.use(currentUser);
app.use(requireAuth);
app.use(fetchUser);

app.use('/api/users/assets', express.static('assets'));

// user handler
app.use(router.notificationUserRouter);
app.use(router.manageStatusRouter);
app.use(router.memberStatusRouter);

app.use('/api/users', connectionRouter);
app.use('/api/users', userRouter);

app.use('/api/teams', teamRouter);



// other handler
app.use(router.searchRouter);
app.use(router.userInfoRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling);
export { app };
