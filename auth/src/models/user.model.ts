import { Model, Sequelize, DataTypes } from 'sequelize';
import { Password } from '../services/password';
interface UserAttributes {
    id: string;
    email: string;
    password?: string;
}
interface UserCreationAttributes {
    id: string;
    email: string;
    password: string;
}

export default class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string
    public email!: string
    public password!: string
    //Called whenever model is changed to JSON
    public toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }

    public getPassword() {
        return this.password
    }
}

//Initializes the user model
export const userInit = function (sequelize: Sequelize) {
    User.init({
        id: {
            type: new DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,

        }
    }, {
        tableName: "users",
        sequelize,
    });

    User.beforeCreate(async (user) => {
        const hashedPassword = await Password.toHash(user.password);
        user.password = hashedPassword;
    })
};

