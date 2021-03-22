import { Model, DataTypes, Sequelize } from 'sequelize';
import { InterestDescription } from '@cuconnex/common';
import { TableName } from './types';

// all atributes interest model has
export interface InterestAttrs {
  description: InterestDescription;
}

// all arguments require to create interest
export interface InterestCreationAttrs {
  description: InterestDescription;
}

class Interest extends Model<InterestAttrs, InterestCreationAttrs> {
  public description!: InterestDescription;
}

const initInterests = (sequelize: Sequelize) => {
  Interest.init({
    description: {
      type: DataTypes.ENUM,
      values: Object.values(InterestDescription),
      // unique: true
      primaryKey: true
    }
  },
    {
      tableName: TableName.interests,
      sequelize,
      timestamps: false
    }
  );

  return Interest;
};

export { Interest, initInterests };
