"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TS can't derive a proper class definition from a `.define` call, therefore we need to cast here.
module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("users", {
        studentId: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return User;
};
