import { Request, Response } from 'express';
const express = require('express')
const path = require('path')
const cors = require('cors');

export const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))


// @TODO add auth middleware
// @TODO add registration page
// @TODO add logout route

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send("Hello World")
})

module.exports = app;