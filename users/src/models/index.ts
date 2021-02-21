import { initUser } from './user.model';
import { initInterests } from './interest.model';
import { initFriend } from './friend.model'
import { Sequelize, DataTypes } from 'sequelize';
import { FriendStatus } from '@cuconnex/common';
import { TableName } from '../models/types'



export const initModel = (sequelize: Sequelize) => {
    const User = initUser(sequelize);
    const Interest = initInterests(sequelize);

    // definde relation for friend 
    const frd = sequelize.define(TableName.friends, {
        status: {
            type: DataTypes.ENUM,
            values: Object.values(FriendStatus),
            defaultValue: FriendStatus.Pending,
            allowNull: false
        }
    })

    User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });
    User.belongsToMany(User, { as: 'friend', through: frd, foreignKey: "senderId", otherKey: "receiverId" });

    initFriend(sequelize);
}
