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
  teamName: string;
  userId: string;
  status: TeamStatus;
}

export interface MemberCreationAttrs {
  teamName: string;
  userId: string;
  status: TeamStatus;
}

class Member extends Model<MemberAttrs, MemberCreationAttrs> implements MemberAttrs {
  public teamName!: string;
  public userId!: string;
  public status!: TeamStatus;
}

const initMember = (sequelize: Sequelize) => {
  Member.init(
    {
      teamName: {
        type: DataTypes.STRING(255),
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
