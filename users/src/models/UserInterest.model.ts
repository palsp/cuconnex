import { Sequelize, Model, DataTypes } from 'sequelize'
import { InterestDescription } from '@cuconnex/common'
import { TableName } from './types';


interface UserInterestAttrs {
    description: string;
    userId: string;
}


interface UserInterestCreationAttrs {
}

class UserInterest extends Model<UserInterestAttrs, UserInterestCreationAttrs> implements UserInterestAttrs {
    public description!: string
    public userId!: string

}

const initUserInterest = (sequelize: Sequelize) => {
    UserInterest.init<UserInterest>({
        description: {
            type: DataTypes.ENUM,
            values: Object.values(InterestDescription),
            // unique: true
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING(10),
            primaryKey: true
        }
    }, {
        tableName: TableName.userInterest,
        sequelize,
        timestamps: false
    });

    return UserInterest;
}


export { UserInterest, initUserInterest };