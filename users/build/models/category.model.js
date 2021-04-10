"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@cuconnex/common");
const types_1 = require("./types");
class Category extends sequelize_1.Model {
    /**
     * Automatically migrate schema, to keep your schema up to date.
     * @param sequelize
     */
    static autoMigrate(sequelize) {
        Category.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category: {
                type: sequelize_1.DataTypes.ENUM,
                values: Object.keys(common_1.InterestDescription),
                primaryKey: true,
            },
        }, {
            tableName: types_1.TableName.category,
            sequelize,
            timestamps: false,
        });
    }
    /**
     * To add type cheking for interest creation from category
     * This function will ensure that all parameters required to create
     * interest is provided
     * @param interest
     */
    createInterestToCategory(interest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createInterest({
                description: interest.description,
            });
        });
    }
}
exports.Category = Category;
