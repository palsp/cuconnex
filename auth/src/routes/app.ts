import { Request, Response } from 'express';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';
import { db } from '../models';
import * as bodyParser from 'body-parser';

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
export const app = express()

var corsOptions = {
    origin: "http://localhost:3000"
};


/*Initialize Middlewares*/

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Parses cookies
app.use(cookieParser())


/* Initialize all the routes */
app.use('/api/test', userRoutes);
app.use('/api/auth', authRoutes);


const Role = db.role;
const User = db.user;

//Drop and Resync db and also create the initial Roles table
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

//A simple method that tests if sequelize connects to the db properly
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send("Hello World")
})

function initial() {
    User.create({
        id: 1,
        username: 'anon123',
        email: 'example@example123.com',
        password: '123'
    });

    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

