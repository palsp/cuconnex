import { Model, DataTypes, Sequelize } from 'sequelize'
import { InterestDescription } from '@cuconnex/common'
import { User } from './user.model';
import { TableName } from './types';


// all atributes interest model has 
export interface InterestAttrs {
    // id: number;
    userId: string;
    description: InterestDescription,
}

// all arguments require to create interest
export interface InterestCreationAttrs {
    description: InterestDescription,
}


class Interest extends Model<InterestAttrs, InterestCreationAttrs>  {
    public userId!: string;
    public description!: InterestDescription

}


const initInterests = (sequelize: Sequelize) => {
    Interest.init({
        userId: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            references: { model: User.tableName }
        },
        description: {
            type: DataTypes.ENUM,
            values: Object.values(InterestDescription),
            unique: true,
            primaryKey: true,

        }
    },
        {
            tableName: TableName.interests,
            sequelize,
            timestamps: false,
        }
    );

    return Interest
}


export { Interest, initInterests };


