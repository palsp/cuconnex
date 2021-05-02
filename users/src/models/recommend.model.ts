import { Sequelize, Model, DataTypes, BelongsToManyGetAssociationsMixin} from 'sequelize';
import { TableName } from './types';

import {Connection } from './connection.model';

interface RecommendAttrs {
    userId: string;
    recommendeeId: string;
    score: number;
    version? : any;
}

interface RecommendCreationAttrs {
    userId: string;
    recommenderId: string;
    score?: number;
}

class Recommend extends Model<RecommendAttrs, RecommendCreationAttrs> implements RecommendAttrs {
    public userId!: string;
    public recommendeeId!: string;
    public score!: number;

    /**
     * Automatically migrate  schema, to keep your schema up to date.
     * @param sequelize 
     */
    public static autoMigrate(sequelize: Sequelize) {
        Recommend.init<Recommend>({
            recommendeeId: {
                type: DataTypes.STRING(11),
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING(11),
                primaryKey: true,

            },
            score: {
                type: DataTypes.DOUBLE(3,2),
                defaultValue: 0,
                allowNull: false,
            }
        }, {
            tableName: TableName.recommendations,
            sequelize,
            timestamps: false
        });
    }

    public static async CalculateScore(userId : string , recommendeeId : string) : Promise<number> {
        const recommend = await Recommend.findOne({ where : { userId ,recommendeeId }});
        let score : number;

        if(!recommend){
            const status = await Connection.findConnection(userId , recommendeeId);
            score = Connection.isConnection(status) ? 4 : 0;
        }else{
            score = recommend.score;
        }
        return score;
    }
}



export { Recommend };