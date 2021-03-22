import { Model, DataTypes, Sequelize } from 'sequelize';
import { TableName } from './types';

// all atributes catogory model has
export interface CategoryAttrs {
  name: string;
}

// all arguments require to create category
export interface CategoryCreationAttrs {
  name: string;
}

class Category extends Model<CategoryAttrs, CategoryCreationAttrs> {
  public name!: string;
}

const initCategory = (sequelize: Sequelize) => {
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {
      tableName: TableName.categories,
      sequelize,
      timestamps: false
    }
  );

  return Category;
};

export { Category, initCategory };
