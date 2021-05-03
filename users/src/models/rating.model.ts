import { Model, Sequelize, DataTypes, BelongsToManyAddAssociationMixin } from 'sequelize';
import { User } from './user.model';
import { TableName } from './types';
import { Team } from './team.model';

export interface RatingAttrs {
	raterId: string;
	rateeId: string;
	rating: number;
	isRate : boolean;
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
	public isRate!: boolean;

	public addRating! : BelongsToManyAddAssociationMixin<User , {through : { rating : number , isRate : boolean}}>

	public static async isRate(rater : User , ratee : User) : Promise<boolean | null>{
		const rate = await Rating.findOne({ where : { raterId : rater.id , rateeId: ratee.id}})
		if(!rate){
			return null;
		}

		return rate.isRate;
	}

	public static async addRateNotification(team : Team){
		const members = await team.getMembers();

		for(let i = 0 ; i < members.length ; i++){
			for(let j = 0 ; j < members.length ; j++){
			  if(i === j){
				continue;
			  }
			  const rate = await Rating.findOne({ where : { raterId : members[i].id , rateeId : members[j].id}});
			if(!rate){
				await members[i].addRatee(members[j] , { through : { isRate : false}});
			}else{
				rate.isRate = false;
				await rate.save();
			}
		  }
		}
	}

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
				isRate : {
					type : DataTypes.BOOLEAN,
					allowNull: false,
				}
			},
			{
				 tableName: TableName.rating,
				sequelize,
				timestamps: false,
			}
		);
	}
}
