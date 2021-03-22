import { Model, DataTypes, Sequelize } from 'sequelize';
import { TableName } from './types';
import { Category } from './category.model';
import { Interest } from './interest.model';
import { InterestDescription } from '@cuconnex/common';

export interface ClassifiedAsAttrs {
  interest: InterestDescription;
  category: string; // category should be string or array or categories ??
}

export interface ClassifiedAsCreationAttrs {
  interest: InterestDescription;
  category: string;
}

class ClassifiedAs extends Model<ClassifiedAsAttrs, ClassifiedAsCreationAttrs> {
  public interest!: InterestDescription;
  public category!: string;

  public async findInterestsAndCates(interest: InterestDescription, category: string) {
    if (category === 'None') {
      const allCates = await ClassifiedAs.findAll({ where: { interest } });
      return allCates;
    }

    const ret = await ClassifiedAs.findAll({ where: { interest, category } });
    return ret;
  }
}

const initClassifiedAs = (sequelize: Sequelize) => {
  ClassifiedAs.init(
    {
      interest: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        references: { model: Interest.tableName }
      },
      category: {
        // if it's 'None' => return every category in the chosen interest
        type: DataTypes.STRING(255),
        primaryKey: true,
        references: { model: Category.tableName }
      }
    },
    {
      tableName: TableName.classifiedAs,
      sequelize,
      timestamps: false
    }
  );
  return ClassifiedAs;
};
export { ClassifiedAs, initClassifiedAs };
