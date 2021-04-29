import { Sequelize, Model, DataTypes, BelongsToManyGetAssociationsMixin} from 'sequelize';
import { TableName } from './types';

interface RecommendAttrs {
    userId: string;
    recommenderId: string;
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
    public recommenderId!: string;
    public score!: number;

    /**
     * Automatically migrate  schema, to keep your schema up to date.
     * @param sequelize 
     */
    public static autoMigrate(sequelize: Sequelize) {
        Recommend.init<Recommend>({
            recommenderId: {
                type: DataTypes.STRING(11),
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING(11),
                primaryKey: true,

            },
            score: {
                type: DataTypes.DOUBLE(5,2),
                defaultValue: 0,
                allowNull: false,
            }
        }, {
            tableName: TableName.recommendations,
            sequelize,
            timestamps: false
        });
    }

}



export { Recommend };