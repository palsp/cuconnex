"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const sequelize_1 = require("sequelize");
const types_1 = require("./types");
const common_1 = require("@cuconnex/common");
class Member extends sequelize_1.Model {
    /**
     * Automatically migrate schema, to keep your schema up to date.
     * @param sequelize
     */
    static autoMigrate(sequelize) {
        Member.init({
            teamName: {
                type: sequelize_1.DataTypes.STRING(255),
                primaryKey: true,
                // references: { model: Team.tableName }
            },
            userId: {
                type: sequelize_1.DataTypes.STRING(11),
                primaryKey: true,
                // references: { model: User.tableName }
            },
            status: {
                type: sequelize_1.DataTypes.ENUM,
                values: Object.values(common_1.TeamStatus),
                allowNull: false
            }
        }, {
            tableName: types_1.TableName.members,
            sequelize,
            timestamps: false
        });
    }
}
exports.Member = Member;
