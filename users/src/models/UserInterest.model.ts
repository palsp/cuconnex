import { Sequelize, Model, DataTypes } from 'sequelize';
import { InterestDescription } from '@cuconnex/common';
import { TableName } from './types';
import { Interest } from './interest.model';

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
  public categoryId! : number;
  public userId!: string;

  /**
   *  Automatically migrate schema, to keep your schema up to date.
   * @param sequelize 
   */
  public static autoMigrate(sequelize: Sequelize) {
    UserInterest.init<UserInterest>(
      {
        interest: {
          type: DataTypes.ENUM,
          values: desc,
          primaryKey: true,
          references : {
            model : Interest,
            key : 'description'
          },

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
  }
}



export { UserInterest };
