import express from 'express';
import 'express-async-errors';
import session from 'cookie-session';
import { json, urlencoded } from 'body-parser';
import { currentUser, errorHandling, requireAuth, NotFoundError } from '@cuconnex/common';
import cors from 'cors';
import * as router from './routes';
import { eventRouter,connectionRouter, userRouter, teamRouter, interestRouter } from './routes';
import { fetchUser } from './middlewares';
require('./config/multer.config');

const app = express();

app.use(cors());
app.set('trust proxy', true);

app.use(json({ limit : '1gb' }));

app.use(urlencoded({ extended: true, limit: '1gb' }));

app.use(
  session({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

/* TODO: put this line below currentUser middleware */
app.use('/api/users/assets', express.static('assets'));

/*TODO: uncomment these three lines after development */
app.use(currentUser);
app.use(requireAuth);
app.use(fetchUser);

app.use('/api/users', interestRouter);

app.use('/api/users', connectionRouter);
app.use('/api/users', userRouter);

app.use('/api/teams', teamRouter);

app.use('/api/teams', eventRouter);

// other handler
app.use(router.searchRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandling);
export { app };
