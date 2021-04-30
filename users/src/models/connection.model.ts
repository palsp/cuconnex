import { Sequelize, Model, DataTypes, Association } from 'sequelize'
import { FriendStatus } from '@cuconnex/common'
import { TableName } from './types';


interface ConnectionAttrs {
    senderId: string;
    receiverId: string;
    status: FriendStatus;
}


interface ConnectionCreationAttrs {
    status?: Connection
}

class Connection extends Model<ConnectionAttrs, ConnectionCreationAttrs> implements ConnectionAttrs {
    public senderId!: string;
    public receiverId!: string;
    public status!: FriendStatus;

    /**
     * Automatically migrate  schema, to keep your schema up to date.
     * @param sequelize 
     */
    public static autoMigrate(sequelize: Sequelize) {
        Connection.init<Connection>({
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
            tableName: TableName.connections,
            sequelize,
            timestamps: false
        });
    }
}



export { Connection };