import { initUser } from './user.model';
import { initInterests } from './interest.model';
import { initTeam } from './team.model';
import { Sequelize } from 'sequelize/types';
import { initMember } from './member.model';

export const initModel = (sequelize: Sequelize) => {
  const User = initUser(sequelize);
  const Interest = initInterests(sequelize);
  const Team = initTeam(sequelize);
  const Member = initMember(sequelize);

  // A.hasOne(B, { /* options */ });      one-to-one foreign key in B
  // A.belongsTo(B, { /* options */ });   one-to-one  foreign key in A
  // A.hasMany(B, { /* options */ });     one-to-many foreign key in B
  // A.belongsToMany(B, { through: 'C', /* options */ });   many-to-many

  // 1-M
  User.hasMany(Interest, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'interests',
    onDelete: 'CASCADE'
  });

  User.hasMany(Team, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'owner',
    onDelete: 'CASCADE'
  });

  // M-M
  Team.belongsToMany(User, {
    through: 'Member',
    foreignKey: 'userId'
  });
  User.belongsToMany(Team, {
    through: 'Member',
    foreignKey: 'teamId'
  });
};
