import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize
} from 'sequelize';

import { User } from './user.model';
import { Team } from './team.model';

import { TeamStatus } from '@cuconnex/common';

// keep member array as id of user
export interface MemberAttrs {
  teamId: string;
  userId: string;
  status: TeamStatus;
}

export interface MemberCreationAttrs {
  teamId: string;
  userId: string;
  status: TeamStatus;
}

class Member extends Model<MemberAttrs, MemberCreationAttrs> implements MemberAttrs {
  public teamId!: string;
  public userId!: string;
  public status!: TeamStatus;
}

const initMember = (sequelize: Sequelize) => {
  Member.init(
    {
      teamId: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        references: { model: Team.tableName }
      },
      userId: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        references: { model: User.tableName }
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(TeamStatus)
      }
    },
    {
      tableName: 'members',
      sequelize
    }
  );
  return Member;
};
export { Member, initMember };
