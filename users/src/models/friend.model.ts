import { Sequelize, Model, DataTypes } from 'sequelize'
import { FriendStatus } from '@cuconnex/common'





interface FriendAttrs {
    senderId: string;
    receiverId: string;
    status: FriendStatus;
}


interface FriendCreationAttrs {
    status?: Friend
}

class Friend extends Model<FriendAttrs, FriendCreationAttrs> implements FriendAttrs {
    public senderId!: string;
    public receiverId!: string;
    public status!: FriendStatus;

}

const initFriend = (sequelize: Sequelize) => {
    Friend.init<Friend>({
        senderId: {
            type: DataTypes.STRING(11),
            primaryKey: true,
        },
        receiverId: {
            type: DataTypes.STRING(11),
            primaryKey: true,

        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(FriendStatus),
            defaultValue: FriendStatus.Pending,
            allowNull: false,
        }
    }, {
        tableName: "friends",
        sequelize,
        timestamps: false
    });

    return Friend;
}


export { Friend, initFriend };