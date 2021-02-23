import { initUser } from './user.model';
import { initTeam } from './team.model';
import { initMember } from './member.model';
import { initInterests } from './interest.model';
import { initFriend } from './friend.model';
import { Sequelize, DataTypes } from 'sequelize';
import { FriendStatus } from '@cuconnex/common';
import { TableName } from '../models/types';

export const initModel = (sequelize: Sequelize) => {
  const User = initUser(sequelize);
  const Interest = initInterests(sequelize);
  const Team = initTeam(sequelize);
  // const Member = initMember(sequelize);

  // A.hasOne(B, { /* options */ });      one-to-one foreign key in B
  // A.belongsTo(B, { /* options */ });   one-to-one  foreign key in A
  // A.hasMany(B, { /* options */ });     one-to-many foreign key in B
  // A.belongsToMany(B, { through: 'C', /* options */ });   many-to-many

  // definde relation for friend
  const frd = sequelize.define(
    TableName.friends,
    {
      status: {
        type: DataTypes.ENUM,
        values: Object.values(FriendStatus),
        defaultValue: FriendStatus.Pending,
        allowNull: false
      }
    },
    { timestamps: false }
  );

  User.hasMany(Interest, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'interests',
    onDelete: 'CASCADE'
  });
  User.belongsToMany(User, {
    as: 'friend',
    through: frd,
    foreignKey: 'senderId',
    otherKey: 'receiverId'
  });

  User.hasMany(Team, { sourceKey: 'id', foreignKey: 'userId', as: 'teams', onDelete: 'CASCADE' });

  // M-M
  Team.belongsToMany(User, { through: 'members' });
  User.belongsToMany(Team, { through: 'members', as: 'member' });

  initFriend(sequelize);
};
