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
exports.userInit = void 0;
const sequelize_1 = require("sequelize");
const password_1 = require("../services/password");
class User extends sequelize_1.Model {
    //Called whenever model is changed to JSON
    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }
    getPassword() {
        return this.password;
    }
}
exports.default = User;
//Initializes the user model
const userInit = function (sequelize) {
    User.init({
        id: {
            type: new sequelize_1.DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: new sequelize_1.DataTypes.STRING,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: "users",
        sequelize,
    });
    User.beforeCreate((user) => __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield password_1.Password.toHash(user.password);
        user.password = hashedPassword;
    }));
};
exports.userInit = userInit;
