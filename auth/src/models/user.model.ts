import { BuildOptions, Model } from "sequelize/types";
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types/SequelizeAttributes';

export interface UserAttributes extends Model {
    studentId?: string;
    name: string;
    email?: string;
    password?: string;
}
// Need to declare the static model so `findOne` etc. use correct types.
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    
}


export const UserFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        name: {
            type: Sequelize.STRING
        }
    };

    const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

    return User;
};