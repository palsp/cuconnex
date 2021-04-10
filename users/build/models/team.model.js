"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const sequelize_1 = require("sequelize");
const types_1 = require("./types");
class Team extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.lookingForMembers = true;
    }
    static autoMigrate(sequelize) {
        Team.init({
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                primaryKey: true
            },
            creatorId: {
                type: sequelize_1.DataTypes.STRING(11),
                allowNull: false
            },
            description: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            lookingForMembers: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            tableName: types_1.TableName.teams,
            sequelize,
            timestamps: false
        });
    }
}
exports.Team = Team;
