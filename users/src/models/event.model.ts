import { DataTypes, Model, Sequelize } from 'sequelize';
import { TableName } from './types';


interface EventAttrs {
    id: number;
    eventName : string;
    registration : boolean;
    version?: number;
}

interface EventCreationAttrs {
    id: number;
    eventName : string;
    registration : boolean;
}

class Event extends Model<EventAttrs , EventCreationAttrs> {
    public id! : number;
    public eventName!: string;
    public registration!: boolean;

    public version?: number;

    public static autoMigrate(sequelize : Sequelize) : void {
        Event.init({
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
            },
            eventName : {
                type : DataTypes.STRING(255),
                allowNull : false,
            },
            registration : {
                type : DataTypes.BOOLEAN,
                allowNull : false,
            }
        },{
            tableName : TableName.events,
            sequelize,
            timestamps : false,
            version : true,
        })
    }
}

export { Event };