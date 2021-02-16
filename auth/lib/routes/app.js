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
var db = require('../models');
var Role = db.role;
db.sequelize.sync({ force: true }).then(function () {
    console.log('Drop and Resync Db');
    initial();
});
exports.app.get('/api', function (req, res) {
    res.status(200).send("Hello World");
});
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
module.exports = exports.app;
