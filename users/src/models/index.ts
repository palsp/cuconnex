import { Sequelize, DataTypes } from 'sequelize';
import { FriendStatus, TeamStatus } from '@cuconnex/common';

import { User } from './user.model';
import { Interest } from './interest.model';
import { TableName } from '../models/types';
import { UserInterest } from './UserInterest.model';
import { Category } from './category.model';
import { Connection } from './connection.model';
import { Recommend } from './recommend.model';
import { Team } from './team.model';
import { IsMember } from './isMember.model';

export { User, Interest, UserInterest, Category, Team, IsMember };



// TODO: add version key


export const autoMigrate = (sequelize: Sequelize) => {
  // -------------------- User and Interest -----------------------------------
  User.autoMigrate(sequelize);
  Interest.autoMigrate(sequelize);
  Team.autoMigrate(sequelize);
  Category.autoMigrate(sequelize);

  const userInterest = sequelize.define(TableName.userInterest, {}, { timestamps: false });
  // M-M user and interest
  User.belongsToMany(Interest, {
    through: userInterest,
    as: 'interests',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });

  Interest.belongsToMany(User, {
    through: userInterest,
    as: 'interests',
    sourceKey: 'description',
    foreignKey: 'interest',
  });

  UserInterest.autoMigrate(sequelize);

  // -------------------- Interest and Category -----------------------------------

  Category.hasMany(Interest, {
    sourceKey: 'id',
    as: 'interests',
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });

  // -------------------- User and User -----------------------------------
  //Define relation for Recommendation
  const recommendation = sequelize.define(
    TableName.recommendations,
    {
      score: {
        type: DataTypes.DOUBLE(2,2),
        defaultValue: 0,
        allowNull: false,
      },
    },
    { timestamps: false  }
  );

  User.belongsToMany(User, {
    as: 'recommendation',
    through: recommendation,
    foreignKey: 'userId',
    otherKey: 'recommenderId',
  });

  Recommend.autoMigrate(sequelize);

  // define relation for connection
  const connection = sequelize.define(
    TableName.connections,
    {
      status: {
        type: DataTypes.ENUM,
        values: Object.values(FriendStatus),
        defaultValue: FriendStatus.Pending,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  User.belongsToMany(User, {
    as: 'connection',
    through: connection,
    foreignKey: 'senderId',
    otherKey: 'receiverId',
  });

  Connection.autoMigrate(sequelize);

  // -------------------- User and Team -----------------------------------
  const isMember = sequelize.define(
    TableName.isMembers,
    {
      status: {
        type: DataTypes.ENUM,
        values: Object.values(TeamStatus),
        defaultValue: TeamStatus.Pending,
        allowNull: false,
      },
      sender: {
        type: DataTypes.STRING,
        defaultValue: 'team',
      },
    },
    { timestamps: false }
  );

  User.hasMany(Team, {
    sourceKey: 'id',
    foreignKey: 'creatorId',
    as: 'teams',
    onDelete: 'CASCADE',
  });

  // M-M
  Team.belongsToMany(User, {
    as: 'member',
    through: isMember,
    sourceKey: 'name',
    foreignKey: 'teamName',
  });

  User.belongsToMany(Team, { as: 'member', through: isMember, foreignKey: 'userId' });

  IsMember.autoMigrate(sequelize);
};
