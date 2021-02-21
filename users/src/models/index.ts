import { User, initUser } from './user.model';
import { Interest, initInterests } from './interest.model';
import { Team, initTeam } from './team.model';
import { Sequelize } from 'sequelize/types';
import { Member, initMember } from './member.model';

export const initModel = (sequelize: Sequelize) => {
  const User = initUser(sequelize);
  const Interest = initInterests(sequelize);
  const Team = initTeam(sequelize);
  const Member = initMember(sequelize);

  User.hasMany(Interest, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'interests',
    onDelete: 'CASCADE'
  });

  // // M-M ====
  // Team.belongsToMany(User, {
  //   through: 'Members',
  //   foreignKey: 'userId'
  // });
  // User.belongsToMany(Team, {
  //   through: 'Members',
  //   foreignKey: 'teamId'
  // });
  // // ====
};
