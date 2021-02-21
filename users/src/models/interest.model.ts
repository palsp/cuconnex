import { Model, DataTypes, Sequelize } from 'sequelize';
import { InterestDescription } from '@cuconnex/common';
import { User } from './user.model';
import { directive, tsConstructorType } from '@babel/types';
import { nodeInternals } from 'stack-utils';

// all atributes interest model has
export interface InterestAttrs {
  // id: number;
  userId: string;
  interest: InterestDescription;
}

// all arguments require to create interest
export interface InterestCreationAttrs {
  interest: InterestDescription;
}

class Interest extends Model<InterestAttrs, InterestCreationAttrs> {
  public userId!: string;
  public interest!: InterestDescription;
}

const initInterests = (sequelize: Sequelize) =>
  Interest.init(
    {
      userId: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        references: { model: User.tableName }
      },
      interest: {
        type: DataTypes.ENUM,
        values: Object.values(InterestDescription),
        unique: true,
        primaryKey: true
      }
    },
    {
      tableName: 'interests',
      sequelize
    }
  );

export { Interest, initInterests };
