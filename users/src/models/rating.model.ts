import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { TableName } from './types';

interface RatingAttrs {
	raterId: string;
	rateeId: string;
	rating: number;
}

interface RatingCreationAttrs
	extends Optional<RatingAttrs, 'raterId' | 'rateeId'> {}

export class Rating
	extends Model<RatingAttrs, RatingCreationAttrs>
	implements RatingAttrs {
	public raterId!: string;
	public rateeId!: string;
	public rating!: number;

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
					type: DataTypes.DOUBLE(),
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
