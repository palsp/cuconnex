import { sequelize } from '../db';
import { Model, DataTypes } from 'sequelize'


interface UserAttrs {
    id: number;
    name: string;
}

interface UserCreationAttrs {
    id: number;
    name: string;
}

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
    public id!: number;
    public name!: string;
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