import { Model, DataTypes, Sequelize } from 'sequelize';
import { Description } from '@cuconnex/common';
import { InterestEnumVal } from './types'
import { TableName } from './types';


// all atributes interest model has
export interface InterestAttrs {
  // description: InterestDescription;
  category_id: number,
  description: Description,
}

// all arguments require to create interest
export interface InterestCreationAttrs {
  description: Description,
}

class Interest extends Model<InterestAttrs, InterestCreationAttrs> {
  // public description!: InterestDescription;
  public category_id!: number
  public description!: Description

  /**
    * Automatically migrate schema, to keep your schema up to date.
    * @param {Sequelize} sequelize
    */
  public static autoMigrate(sequelize: Sequelize) {
    Interest.init({
      description: {
        type: DataTypes.ENUM,
        values: InterestEnumVal,
        // unique: true
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: TableName.category }
      },
    },
      {
        tableName: TableName.interests,
        sequelize,
        timestamps: false
      }
    );
  }



  /**
   * This function return new array which values 
   * from interests array that exists in category array
   * @param interests 
   * @param category 
   * @returns 
   */
  public static validateDescription(interests: any[], category: any[]): any[] {
    // return only value exists in category
    const result = interests.filter(name => category.includes(name));
    return this.removeDuplicate(result)
  }


  /**
   * returns array which duplicate values are removed from the input array
   */
  public static removeDuplicate(interests: any[]): any[] {
    return Array.from(new Set(interests))
  }


  public serializer(): string {
    return this.description
  }
}


/**
 *  VALID interest description 
 *  used for description enum in interest database
 */




export { Interest };
