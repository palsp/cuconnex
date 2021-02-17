import { sequelize } from '../db'
import { Model, DataTypes } from 'sequelize'
import { InterestDescription } from '@cuconnex/common'
import { User } from './user.model';


// all atributes interest model has 
export interface InterestAttrs {
    // id: number;
    userId: number;
    interest: InterestDescription,
}

// all arguments require to create interest
export interface InterestCreationAttrs {
    interest: InterestDescription,
}


class Interest extends Model<InterestAttrs, InterestCreationAttrs>  {
    public userId!: number;
    public interest!: InterestDescription

}


Interest.init({
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: { model: User.tableName }
    },
    interest: {
        type: DataTypes.ENUM,
        values: Object.values(InterestDescription),
        unique: true,
        primaryKey: true,

    }
},
    {
        tableName: "interests",
        sequelize
    }
);



export { Interest };

