import { Model, Sequelize, DataTypes } from 'sequelize';
import { TableName } from './types';

interface RatingAttrs {
	raterId: string;
	rateeId: string;
	rating: number;
	version?: any;
}

interface RatingCreationAttrs {
	raterId: string;
	rateeId: string;
	rating?: number;
}

class Rating
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
					type: DataTypes.DOUBLE(1, 1),
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

export { Rating };
