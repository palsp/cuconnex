import { Request, Response } from 'express';
const express = require('express');
const path = require('path');
import { db } from '../models';
const cors = require('cors');
const bodyParser = require('body-parser');

export const app = express()

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send("Hello World")
})

function initial() {
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

