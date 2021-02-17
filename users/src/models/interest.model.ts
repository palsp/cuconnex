import { sequelize } from '../db'
import { Model, DataTypes } from 'sequelize'
import { InterestDescription } from '@cuconnex/common'


// all atributes interest model has 
interface InterestAttrs {
    // id: number;
    interest: InterestDescription,
}

// all arguments require to create interest
interface InterestCreationAttrs {
    interest: InterestDescription,
}


class Interest extends Model<InterestAttrs, InterestCreationAttrs>  {
    // public id!: number;
    public interest!: InterestDescription

}


Interest.init({
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

