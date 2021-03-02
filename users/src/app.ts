import express from 'express';
require('express-async-errors');
import session from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandling, requireAuth, NotFoundError } from '@cuconnex/common';


import { fetchUser } from './middlewares';
import * as router from './routes';


const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
  session({
    signed: false,
    secure: false
    // httpOnly : true,
  })
);

app.use(currentUser);
app.use(requireAuth);
app.use(fetchUser);

// user routes
app.use(router.getUserRouter);
app.use(router.newUserRouter);
app.use(router.addFriendRouter);

// team routes
app.use(router.getTeamRouter);
app.use(router.newTeamRouter);
app.use(router.getMemberRouter);
app.use(router.addMemberRouter);

// other routes
app.use(router.memberStatusRouter);
app.use(router.searchRouter)


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling);
export { app };
