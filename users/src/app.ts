import express from 'express';
require('express-async-errors');
import session from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandling, requireAuth, NotFoundError } from '@cuconnex/common';

import { fetchUser } from './middlewares/fetch-user';

import { newUserRouter } from './routes/new-user';
import { getUserRouter } from './routes/get-user';
import { searchRouter } from './routes/search';
import { addFriendRouter } from './routes/add-friend';

import { newTeamRouter } from './routes/new-team';
import { getTeamRouter } from './routes/get-team';

import { addMemberRouter } from './routes/add-member';
import { getMemberRouter } from './routes/get-member';
import { memberStatusRouter } from './routes/status';

const app = express();

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

app.use(newUserRouter);
app.use(getUserRouter);
app.use(searchRouter);
app.use(addFriendRouter);

app.use(newTeamRouter);
app.use(getTeamRouter);

app.use(getMemberRouter);
app.use(addMemberRouter);
app.use(memberStatusRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling, () => {
  console.log('err handling');
});
export { app };
