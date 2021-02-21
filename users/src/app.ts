import express from 'express';
require('express-async-errors');
import session from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandling } from '@cuconnex/common';
import { newUserRouter } from './routes/new-user';
import { getUserRouter } from './routes/get-user';
import { newTeamRouter } from './routes/new-team';
import { getTeamRouter } from './routes/get-team';

import { memberRouter } from './routes/status';
import { addMemberRouter } from './routes/add-member';

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

app.use(newUserRouter);
app.use(getUserRouter);

app.use(newTeamRouter);
app.use(getTeamRouter);

app.use(memberRouter);
app.use(addMemberRouter);

app.use(errorHandling);

export { app };
