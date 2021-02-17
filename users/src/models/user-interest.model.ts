import { DataType, DataTypes, Model } from 'sequelize'
import { InterestDescription } from '@cuconnex/common'
import { sequelize } from '../db'
import { Interest } from './interest.model';

interface UserInterestAttrs {
    userId: number;
    interest: InterestDescription;
};

interface UserInterestCreationAttrs { };


class UserInterest extends Model<UserInterestAttrs, UserInterestCreationAttrs>  { }


UserInterest.init<Model<UserInterestAttrs, UserInterestCreationAttrs>>({
    userId: {
        type: DataTypes.NUMBER,
    },
    interest: {
        type: DataTypes.ENUM,
        values: Object.values(InterestDescription),

    }
}, { tableName: "userInterest", sequelize });


export { UserInterest }