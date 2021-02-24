import { authRoutes } from './auth.routes';
require('express-async-errors');
import Session from 'cookie-session';
import * as bodyParser from 'body-parser';
import { errorHandling } from '@cuconnex/common';

const express = require('express');
export const app = express()

var corsOptions = {
    origin: "http://localhost:3000"
};

process.env.JWT_KEY = "asdfasfad"

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

/* Initialize all the routes */
// app.use('/api/test', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandling);

