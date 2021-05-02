import { DataTypes, Model, Sequelize } from 'sequelize'
import { TableName } from './types';

// all atributes the model has
interface Attrs {
    attr1: string;
    attr2: string;
}

// all arguments require to create the model
interface CreationAttrs {
    attr1: string;
}

class CustomModel extends Model<Attrs, CreationAttrs>{
    // declare attributes and types......
    public attr1!: string
    public attr2!: string

    // declare all method added by sequelize
    // all possible method is in sequelize doc
    // public addModel!: HasManyCreateAssociationMixin<Model>;



    // declare autoMigrate function to sync the model with the database
    public static autoMigrate(sequelize: Sequelize): void {
        CustomModel.init({
            // specify all constraint
            attr1: {
                type: DataTypes.STRING
            },
            attr2: {
                type: DataTypes.STRING
            },
        }, {
            // declare table name 
            // table name is declare in type.ts file
            tableName: TableName.myModel,
            sequelize
        })
    }

    // specify all association of this model
    public static associations: {

    }

    // other method that related to the model is specify below.....
}

export { CustomModel };