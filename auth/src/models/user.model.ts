import { Model, Sequelize, DataTypes } from 'sequelize';
import { values } from 'sequelize/types/lib/operators';
// import { Table, Column, BelongsToMany, PrimaryKey } from 'sequelize-typescript'
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

// @Table
// export default class User extends Model<UserAttributes, UserCreationAttributes> {

//     @PrimaryKey
//     @Column
//     id!: number;

//     @Column
//     email!: string;

//     @Column
//     username!: string;

//     @Column
//     password!: string;

//     // @BelongsToMany(() => Role, () => UserRoles)
//     // roles?: Role[];
// }

export default class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string
    public email!: string
    public password!: string
    public toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }

    public getPassword() {
        return this.password
    }
}


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

