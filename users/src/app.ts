import express from 'express';
require('express-async-errors');
import session from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandling, requireAuth, NotFoundError } from '@cuconnex/common';

import { fetchUser } from './middlewares';
import * as router from './routes';
import { upload } from './config/multer.config';



const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
  session({
    signed: false,
    secure: false,
    // httpOnly : true,
  })
);

app.use(currentUser);
app.use(requireAuth);
app.use(fetchUser);

// user handler
app.use(router.getUserRouter);
app.use(router.newUserRouter);
app.use(router.addFriendRouter);
app.use(router.notificationUserRouter);
app.use(router.manageStatusRouter);

// team handler
app.use(router.getTeamRouter);
app.use(router.newTeamRouter);
app.use(router.getMemberRouter);
app.use(router.addMemberRouter);

// other handler
app.use(router.memberStatusRouter);
app.use(router.searchRouter);



app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling);
export { app };
