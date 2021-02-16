"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
exports.app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
exports.app.use(cors(corsOptions));
// parse requests of content-type - application/json
exports.app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
exports.app.use(bodyParser.urlencoded({ extended: true }));
// @TODO add auth middleware
// @TODO add registration page
// @TODO add logout route
exports.app.get('/api', function (req, res) {
    res.status(200).send("Hello World");
});
module.exports = exports.app;
