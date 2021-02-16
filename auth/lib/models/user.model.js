"use strict";
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
