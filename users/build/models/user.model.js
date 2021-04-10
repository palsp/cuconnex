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
exports.User = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@cuconnex/common");
const types_1 = require("./types");
const interest_model_1 = require("./interest.model");
const connection_model_1 = require("./connection.model");
class User extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.lookingForTeam = true;
    }
    /**
     * Automatically migrate schema, to keep your schema up to date.
     * @param {Sequelize} sequelize
     */
    static autoMigrate(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.STRING(10),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            faculty: {
                type: sequelize_1.DataTypes.STRING(255),
            },
            image: {
                type: sequelize_1.DataTypes.STRING(255),
            },
            lookingForTeam: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
        }, {
            tableName: types_1.TableName.users,
            sequelize,
            timestamps: false,
        });
    }
    /**
     * Adds interest from a given Array of InterestCreationAttrs to the user who calls this method.
     *
     * This is done via calling the `BelongsToManyAddAssociationMixin` on the `<Interest, User>` pair
     * @param {Description[]} interests - The array of interests the user is interested in.
     */
    addInterestFromArray(interests) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let interest of interests) {
                try {
                    // find corresponding interest in db
                    const addedInterest = yield interest_model_1.Interest.findOne({ where: { description: interest } });
                    yield this.addInterest(addedInterest);
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
    //Method for finding a relation attached here to minimize hassle
    /**A method to check if the current user has a relationship with the user with specified id.
     * This is done by querying the Friend database for any ones with `senderId` equal to current user id
     * and `receiverId` equal to the specified id or vice versa.
     *
     * If a relationship is found, returns the friendship status between the two users
     *
     * else, returns `FriendStatus.toBeDefined`
     *
     * @param {string} userId - The id of the user we wish to check for a relationship with the current user id.
     * @returns {FriendStatus | null} friend.status - The friend status between the two users, if the relationship exists
     */
    findRelation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id === userId)
                return null;
            const constraint = {
                [sequelize_1.Op.or]: [
                    { senderId: this.id, receiverId: userId },
                    { senderId: userId, receiverId: this.id },
                ],
            };
            const friend = yield connection_model_1.Connection.findOne({ where: constraint });
            if (!friend) {
                return common_1.FriendStatus.toBeDefined;
            }
            return friend.status;
        });
    }
    /**
     * addConnection with additional logic to check whether the connection is established.
     * if not, this method will and connection to db. otherwise, it will reject the addConnection
     * @param {User} user - the user to add as a friend to the current user.
     * @returns the result of calling `this.addConnection(user)` with the specified user, if the relationship is not already established, returns **null** otherwise.
     */
    requestConnection(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.findRelation(user.id);
            // if friend relation is established or alredy send a request
            if (status === common_1.FriendStatus.Accept || status === common_1.FriendStatus.Pending) {
                return;
            }
            return this.addConnection(user);
        });
    }
    /**
     * Method for finding a user with the specified userId.
     * Returns a promise that resolves if a user is found.
     *
     * if the user is not found, throws a new NotFoundError
     * @param userId - The id of the user we wish to find
     * @throws {NotFoundError} - if the user is not found
     * @return {User}`user` - the found user, if it exists
     */
    static findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findByPk(userId);
            // check if user who is added exists in the database
            if (!user) {
                throw new common_1.NotFoundError();
            }
            return user;
        });
    }
    /**
     * A function for accepting the friend request. It first checks if the user whose id was passed in has sent
     * a friend request to the current user or not. If so, then it changes the friendStatus of the two according to the
     * passed in accepted parameter.
     * @param userId - the user who send the friend request
     * @param accepted - whether or not the current user accepts the friend request
     * @returns
     */
    acceptConnection(userId, accepted) {
        return __awaiter(this, void 0, void 0, function* () {
            const relation = yield connection_model_1.Connection.findOne({ where: { senderId: userId, receiverId: this.id } });
            if (!relation) {
                throw new common_1.BadRequestError('User has not send a request yet');
            }
            if (accepted) {
                relation.status = common_1.FriendStatus.Accept;
            }
            else {
                relation.status = common_1.FriendStatus.Reject;
            }
            try {
                yield relation.save();
            }
            catch (err) {
                throw new Error('Db connection failed');
            }
            return relation.status;
        });
    }
    /**
     * Creates Team with the specified name and description
     * @param {TeamCreationAttrs} attrs - A TeamCreationAttrs object consisting of the team name and description
     * @param {string} attrs.name - The name of the team
     * @param {string} attrs.description - A description of the team
     * @returns
     */
    createTeams(attrs) {
        return this.createTeam({
            name: attrs.name,
            description: attrs.description,
        });
    }
}
exports.User = User;
