import { initUser } from './user.model';
import { initInterests } from './interest.model';
import { Sequelize } from 'sequelize/types';


export const initModel = (sequelize: Sequelize) => {
    const User = initUser(sequelize);
    const Interest = initInterests(sequelize);
    User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });

}