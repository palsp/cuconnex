"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoMigrate = exports.Member = exports.Team = exports.Category = exports.UserInterest = exports.Interest = exports.User = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@cuconnex/common");
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
const interest_model_1 = require("./interest.model");
Object.defineProperty(exports, "Interest", { enumerable: true, get: function () { return interest_model_1.Interest; } });
const types_1 = require("../models/types");
const UserInterest_model_1 = require("./UserInterest.model");
Object.defineProperty(exports, "UserInterest", { enumerable: true, get: function () { return UserInterest_model_1.UserInterest; } });
const category_model_1 = require("./category.model");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return category_model_1.Category; } });
const connection_model_1 = require("./connection.model");
const team_model_1 = require("./team.model");
Object.defineProperty(exports, "Team", { enumerable: true, get: function () { return team_model_1.Team; } });
const member_model_1 = require("./member.model");
Object.defineProperty(exports, "Member", { enumerable: true, get: function () { return member_model_1.Member; } });
const autoMigrate = (sequelize) => {
    // -------------------- User and Interest -----------------------------------
    user_model_1.User.autoMigrate(sequelize);
    interest_model_1.Interest.autoMigrate(sequelize);
    team_model_1.Team.autoMigrate(sequelize);
    category_model_1.Category.autoMigrate(sequelize);
    // Member.autoMigrate(sequelize);
    const userInterest = sequelize.define(types_1.TableName.userInterest, {}, { timestamps: false });
    // M-M user and interest
    user_model_1.User.belongsToMany(interest_model_1.Interest, {
        through: userInterest,
        as: "interests",
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    });
    // Interest.belongsToMany(User, {
    //   through: userInterest,
    //   as: "categories",
    //   sourceKey: "category_id",
    //   foreignKey: "category_id"
    // });
    interest_model_1.Interest.belongsToMany(user_model_1.User, {
        through: userInterest,
        as: "interests",
        sourceKey: "description",
        foreignKey: "interest",
    });
    UserInterest_model_1.UserInterest.autoMigrate(sequelize);
    // -------------------- Interest and Category ----------------------------------- 
    category_model_1.Category.hasMany(interest_model_1.Interest, {
        sourceKey: "id",
        as: "interests",
        foreignKey: "category_id",
        onDelete: "CASCADE",
    });
    // -------------------- User and User ----------------------------------- 
    // definde relation for connection
    const connection = sequelize.define(types_1.TableName.connections, {
        status: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(common_1.FriendStatus),
            defaultValue: common_1.FriendStatus.Pending,
            allowNull: false
        }
    }, { timestamps: false });
    user_model_1.User.belongsToMany(user_model_1.User, {
        as: "connection",
        through: connection,
        foreignKey: 'senderId',
        otherKey: 'receiverId'
    });
    connection_model_1.Connection.autoMigrate(sequelize);
    // -------------------- User and Team ----------------------------------- 
    const member = sequelize.define(types_1.TableName.members, {
        status: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(common_1.TeamStatus),
            defaultValue: common_1.TeamStatus.Pending,
            allowNull: false
        }
    }, { timestamps: false });
    user_model_1.User.hasMany(team_model_1.Team, {
        sourceKey: 'id',
        foreignKey: 'creatorId',
        as: 'teams',
        onDelete: 'CASCADE'
    });
    // M-M
    team_model_1.Team.belongsToMany(user_model_1.User, { through: member, sourceKey: "name", foreignKey: "teamName" });
    user_model_1.User.belongsToMany(team_model_1.Team, { through: member, foreignKey: "userId" });
    member_model_1.Member.autoMigrate(sequelize);
};
exports.autoMigrate = autoMigrate;
