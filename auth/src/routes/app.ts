import { Request, Response } from 'express';
const express = require('express')
const path = require('path')
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


// @TODO add auth middleware
// @TODO add registration page
// @TODO add logout route

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send("Hello World")
})

module.exports = app;