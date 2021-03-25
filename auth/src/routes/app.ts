import { authRoutes } from './auth.routes';
require('express-async-errors');
import Session from 'cookie-session';
import * as bodyParser from 'body-parser';
import { errorHandling } from '@cuconnex/common';
import cors from 'cors';

const express = require('express');
export const app = express()

var corsOptions = {
    origin: "http://localhost:3000"
};


app.use(cors());
app.set('trust proxy', true);


/*Initialize Middlewares*/

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
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

