import { Model, DataTypes, Sequelize } from 'sequelize';
import { InterestDescription } from '@cuconnex/common';
import { User } from './user.model';
import { Team } from './team.model';

// all atributes interest model has
interface OwnerAttrs {
  userId: string;
  teamId: string;
}

// all arguments require to create interest
interface OwnerCreationAttrs {
  userId: string;
  teamId: string;
}

class Owner extends Model<OwnerAttrs, OwnerCreationAttrs> {
  public userId!: string;
  public teamId!: string;
}

const initOwner = (sequelize: Sequelize) =>
  Owner.init(
    {
      userId: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        references: { model: User.tableName }
      },
      teamId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: { model: Team.tableName }
      }
    },
    {
      tableName: 'owners',
      sequelize
    }
  );

export { Owner, OwnerAttrs };
