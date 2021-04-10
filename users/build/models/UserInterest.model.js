"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterest = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@cuconnex/common");
const types_1 = require("./types");
let desc = [];
for (let key in common_1.InterestDescription) {
    const interest = Object.values(common_1.InterestDescription[key]);
    desc = desc.concat(interest);
}
class UserInterest extends sequelize_1.Model {
    /**
     *  Automatically migrate schema, to keep your schema up to date.
     * @param sequelize
     */
    static autoMigrate(sequelize) {
        UserInterest.init({
            interest: {
                type: sequelize_1.DataTypes.ENUM,
                values: desc,
                primaryKey: true
            },
            userId: {
                type: sequelize_1.DataTypes.STRING(10),
                primaryKey: true
            }
        }, {
            tableName: types_1.TableName.userInterest,
            sequelize,
            timestamps: false
        });
    }
}
exports.UserInterest = UserInterest;
