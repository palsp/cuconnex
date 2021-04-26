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

app.use(cors());
app.set('trust proxy', true);

// app.use(corsHandler);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(json());
app.use(urlencoded({ extended: true, limit: '800mb' }));

app.use(
  session({
    signed: false,
    secure: false,
  })
);

/* TODO: put this line below currentUser middleware */
app.use('/api/users/assets', express.static('assets'));

/*TODO: uncomment these three lines after development */
app.use(currentUser);
app.use(requireAuth);
app.use(fetchUser);

app.use('/api/users', connectionRouter);
app.use('/api/users', userRouter);

app.use('/api/teams', teamRouter);

// other handler
app.use(router.searchRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling);
export { app };
