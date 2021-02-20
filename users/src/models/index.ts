import { User, initUser } from './user.model';
import { Interest, initInterests } from './interest.model';
import { Sequelize } from 'sequelize/types';


export const initModel = (sequelize: Sequelize) => {
    initUser(sequelize);
    initInterests(sequelize);
    User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });

}