import { Model, DataTypes, Sequelize, HasManyAddAssociationMixin, Association } from 'sequelize';
import { InterestDescription, Description } from '@cuconnex/common';
import { TableName } from './types';
import { Interest } from './interest.model';


// all atributes interest model has
export interface CategoryAttrs {
    id: number,
    category: string,
}

// all arguments require to create interest
export interface CategoryCreationAttrs {
    category: string,
}

class Category extends Model<CategoryAttrs, CategoryCreationAttrs> {
    public id!: number
    public category!: string


    public addInterest!: HasManyAddAssociationMixin<Interest, "id">;

}


const initCategory = (sequelize: Sequelize) => {
    Category.init({
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
            timestamps: false
        }
    );

    return Category;
};

export { Category, initCategory };
