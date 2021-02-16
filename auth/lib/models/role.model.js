"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, Sequelize) {
    var Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Role;
};
