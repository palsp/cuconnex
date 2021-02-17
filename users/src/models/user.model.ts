import { sequelize } from '../db';
import { Model, DataTypes, Optional, HasManyCreateAssociationMixin, Association } from 'sequelize'
import { Interest, InterestCreationAttrs } from './interest.model'


// All attributes in user model
interface UserAttrs {
    id: number;
    name: string;
}

interface UserCreationAttrs extends Optional<UserAttrs, "id"> {
    name: string;
}


class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
    public id!: number;
    public name!: string;

    public createInterest!: HasManyCreateAssociationMixin<Interest>

    public createInterests(attrs: InterestCreationAttrs) {
        return this.createInterest({ interest: attrs.interest })
    }


    public static associations: {
        interests: Association<User, Interest>;
    }
}



User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: "users",
        sequelize,
    }
);






export { User }