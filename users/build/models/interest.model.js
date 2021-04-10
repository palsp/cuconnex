"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interest = void 0;
const sequelize_1 = require("sequelize");
const types_1 = require("./types");
const types_2 = require("./types");
class Interest extends sequelize_1.Model {
    /**
      * Automatically migrate schema, to keep your schema up to date.
      * @param {Sequelize} sequelize
      */
    static autoMigrate(sequelize) {
        Interest.init({
            description: {
                type: sequelize_1.DataTypes.ENUM,
                values: types_1.InterestEnumVal,
                // unique: true
                primaryKey: true,
            },
            category_id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                references: { model: types_2.TableName.category }
            },
        }, {
            tableName: types_2.TableName.interests,
            sequelize,
            timestamps: false
        });
    }
    /**
     * This function return new array which values
     * from interests array that exists in category array
     * @param interests
     * @param category
     * @returns
     */
    static validateDescription(interests, category) {
        // return only value exists in category
        const result = interests.filter(name => category.includes(name));
        return this.removeDuplicate(result);
    }
    /**
     * returns array which duplicate values are removed from the input array
     */
    static removeDuplicate(interests) {
        return Array.from(new Set(interests));
    }
}
exports.Interest = Interest;
