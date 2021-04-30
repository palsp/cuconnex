import { Sequelize } from 'sequelize';


import { User } from './user.model';
import { Interest } from './interest.model';
import { UserInterest } from './UserInterest.model';
import { Category } from './category.model';
import { Connection } from './connection.model';
import { Recommend } from './recommend.model';
import { Team } from './team.model';
import { IsMember } from './isMember.model';
import { Rating } from './rating.model';

export { User, Interest, UserInterest, Category, Team, IsMember, Rating };



// TODO: add version key

export const autoMigrate = (sequelize: Sequelize) => {
  // -------------------- User and Interest -----------------------------------
  User.autoMigrate(sequelize);
  Interest.autoMigrate(sequelize);
  Team.autoMigrate(sequelize);
  Category.autoMigrate(sequelize);
  UserInterest.autoMigrate(sequelize);
  IsMember.autoMigrate(sequelize);
  Connection.autoMigrate(sequelize);
  Recommend.autoMigrate(sequelize);
  Rating.autoMigrate(sequelize);

  // Rating M-M user
  User.belongsToMany(User, {
    as: 'rating',
    through: Rating,
    foreignKey: 'raterId',
    otherKey: 'rateeId',
  })

  // M-M user and interest
  User.belongsToMany(Interest, {
    through: UserInterest,
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });

  Interest.belongsToMany(User, {
    through: UserInterest,
    as: 'interests',
    sourceKey: 'description',
    foreignKey : 'interest',
    onDelete : 'CASCADE',
  });

  // -------------------- Interest and Category -----------------------------------

  Category.hasMany(Interest, {
    sourceKey: 'id',
    as: 'interests',
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });

  // -------------------- User and User -----------------------------------
  //Define relation for Recommendation
 

  User.belongsToMany(User, {
    as: 'recommendation',
    through: Recommend,
    foreignKey: 'userId',
    otherKey: 'recommenderId',
  });



  // define relation for connection
  User.belongsToMany(User, {
    as: 'connection',
    through: Connection,
    foreignKey: 'senderId',
    otherKey: 'receiverId',
  });

  // -------------------- User and Team -----------------------------------
 

  User.hasMany(Team, {
    sourceKey: 'id',
    foreignKey: 'creatorId',
    as: 'teams',
    onDelete: 'CASCADE',
  });

  // M-M
  Team.belongsToMany(User, {
    as: 'member',
    through: IsMember,
    sourceKey: 'name',
    foreignKey: 'teamName',
  });

  User.belongsToMany(Team, { as: 'member', through: IsMember, foreignKey: 'userId' });

 
};
