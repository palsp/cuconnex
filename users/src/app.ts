import express from 'express';
require('express-async-errors');
import session from 'cookie-session';
import { json, urlencoded } from 'body-parser';
import { currentUser, errorHandling, requireAuth, NotFoundError } from '@cuconnex/common';
import cors from 'cors';
import { fetchUser } from './middlewares';
import * as router from './routes';
import { connectionRouter, userRouter } from './routes';
import { interestRouter } from './routes/interest.routes';
require('./config/multer.config');

const app = express();

app.use(cors());
app.set('trust proxy', true);

app.use(json());
app.use(urlencoded({ extended: true }));
// app.use(cors());

app.use(
  session({
    signed: false,
    secure: false,
    // httpOnly : true,
  })
);
/*TODO: uncomment these three lines after development */
// app.use(currentUser);
// app.use(requireAuth);
// app.use(fetchUser);

app.use('/api/users/assets', express.static('assets'));

// user handler
app.use(router.notificationUserRouter);
app.use(router.manageStatusRouter);

app.use('/api/users', userRouter);
app.use('/api/users', connectionRouter);

app.use(interestRouter);
// team handler
app.use(router.getTeamRouter);
app.use(router.newTeamRouter);
app.use(router.getMemberRouter);
app.use(router.addMemberRouter);

// other handler
app.use(router.memberStatusRouter);
app.use(router.searchRouter);
app.use(router.userInfoRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling);
export { app };
