import { Model, Sequelize, DataTypes, BelongsToManyAddAssociationMixin } from 'sequelize';
import { User } from './user.model';
import { TableName } from './types';

export interface RatingAttrs {
	raterId: string;
	rateeId: string;
	rating: number;
	version?: any;
}

export interface RatingCreationAttrs {
	raterId: string;
	rateeId: string;
	rating?: number;
}

export class Rating
	extends Model<RatingAttrs, RatingCreationAttrs>
	implements RatingAttrs {
	public raterId!: string;
	public rateeId!: string;
	public rating!: number;

	public addRating! : BelongsToManyAddAssociationMixin<User , {through : { rating : number}}>

	public static autoMigrate(sequelize: Sequelize) {
		Rating.init(
			{
				raterId: {
					type: DataTypes.STRING(255),
					primaryKey: true,
				},
				rateeId: {
					type: DataTypes.STRING(255),
					primaryKey: true,
				},
				rating: {
					type: DataTypes.DOUBLE(3, 2), // accept 3 digit in total and 2 digit must be behind the decimal point
					defaultValue: 0,
					allowNull: false,
				},
			},
			{
				tableName: TableName.rating,
				sequelize,
				timestamps: false,
			}
		);
	}
}
