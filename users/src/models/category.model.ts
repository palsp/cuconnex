import {
  Model,
  DataTypes,
  Sequelize,
  HasManyAddAssociationMixin,
  Association,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { InterestDescription } from '@cuconnex/common';
import { TableName } from './types';
import { Interest, InterestCreationAttrs } from './interest.model';

// all atributes interest model has
export interface CategoryAttrs {
  id: number;
  category: string;
}

// all arguments require to create interest
export interface CategoryCreationAttrs {
  category: string;
}

class Category extends Model<CategoryAttrs, CategoryCreationAttrs> {
  public id!: number;
  public category!: string;

  public addInterest!: HasManyAddAssociationMixin<Interest, 'id'>;
  public getInterests!: HasManyGetAssociationsMixin<Interest>;
  public createInterest!: HasManyCreateAssociationMixin<Interest>;

  public interests?: Interest[];

  /**
   * Automatically migrate schema, to keep your schema up to date.
   * @param sequelize 
   */
  public static autoMigrate(sequelize: Sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        category: {
          type: DataTypes.ENUM,
          values: Object.keys(InterestDescription),
          primaryKey: true,
        },
      },
      {
        tableName: TableName.category,
        sequelize,
        timestamps: false,
      }
    );
  }
  /**
   * To add type cheking for interest creation from category
   * This function will ensure that all parameters required to create
   * interest is provided
   * @param interest
   */
  public async createInterestToCategory(interest: InterestCreationAttrs) {
    await this.createInterest({
      description: interest.description,
    });
  }

  public static associations: {
    interests: Association<Category, Interest>;
  };
}



export { Category };
