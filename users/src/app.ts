import express from 'express';
require('express-async-errors');
import session from 'cookie-session'
import { json } from 'body-parser'
import { currentUser, errorHandling } from '@cuconnex/common';
import { newUserRouter } from './routes/new-user';

const app = express();

app.use(json());

app.use(session({
    signed: false,
    secure: false,
    // httpOnly : true,
}));

app.use(currentUser);

app.use(newUserRouter);

app.use(errorHandling);


export { app }