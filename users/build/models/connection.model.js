"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@cuconnex/common");
const types_1 = require("./types");
class Connection extends sequelize_1.Model {
    /**
     * Automatically migrate  schema, to keep your schema up to date.
     * @param sequelize
     */
    static autoMigrate(sequelize) {
        Connection.init({
            senderId: {
                type: sequelize_1.DataTypes.STRING(11),
                primaryKey: true,
            },
            receiverId: {
                type: sequelize_1.DataTypes.STRING(11),
                primaryKey: true,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM,
                values: Object.values(common_1.FriendStatus),
                defaultValue: common_1.FriendStatus.Pending,
                allowNull: false,
            }
        }, {
            tableName: types_1.TableName.connections,
            sequelize,
            timestamps: false
        });
    }
}
exports.Connection = Connection;
