import { Sequelize, Model, DataTypes } from 'sequelize';
import { InterestDescription } from '@cuconnex/common';
import { TableName } from './types';

let desc: any[] = [];

for (let key in InterestDescription) {
  const interest = Object.values(InterestDescription[key]);
  desc = desc.concat(interest)
}


interface UserInterestAttrs {

  interest: string;
  userId: string;
}

interface UserInterestCreationAttrs { }

class UserInterest extends Model<UserInterestAttrs, UserInterestCreationAttrs>
  implements UserInterestAttrs {
  public interest!: string;
  public userId!: string;
}

const initUserInterest = (sequelize: Sequelize) => {
  UserInterest.init<UserInterest>(
    {
      interest: {
        type: DataTypes.ENUM,
        values: desc,
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING(10),
        primaryKey: true
      }
    },
    {
      tableName: TableName.userInterest,
      sequelize,
      timestamps: false
    }
  );

  return UserInterest;
};

export { UserInterest, initUserInterest };
