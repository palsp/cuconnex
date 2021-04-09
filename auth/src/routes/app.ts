import { authRoutes } from './auth.routes';
require('express-async-errors');
import cors from 'cors';
import Session from 'cookie-session';
import { json, urlencoded } from 'body-parser';
import { errorHandling } from '@cuconnex/common';
import express from 'express';



export const app = express()


app.use(cors());
app.set('trust proxy', true);


/*Initialize Middlewares*/

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
//Parses cookies
// app.use(cookieParser())


app.use(Session({
    signed: false,
    secure: false,
}))

/* Initialize all the handler */
// app.use('/api/test', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandling);

