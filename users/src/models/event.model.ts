import { DataTypes, Model, Sequelize } from 'sequelize';
import { TableName } from './types';
import { BelongsToManyGetAssociationsMixin } from 'sequelize';
import { Team } from './team.model';
import { IEventResponse } from '../interfaces/event';
import { ITeamResponse } from '../interfaces';
import { EventStatus } from '@cuconnex/common/build/db-status/event';

interface EventAttrs {
  id: number;
  eventName: string;
  registration: boolean;
  status : EventStatus;
  image? : string;
  candidate? : Team[];
  version?: number;
}

interface EventCreationAttrs {
  id: number;
  eventName: string;
  status: EventStatus;
  registration: boolean;
}

class Event extends Model<EventAttrs, EventCreationAttrs> {
  public id!: number;
  public eventName!: string;
  public registration!: boolean;
  public status! : EventStatus;
  public image? : string;
  public candidate? : Team[];

  public version?: number;

  public getCandidate!: BelongsToManyGetAssociationsMixin<Team>;

  public async getMyCandidates(): Promise<Team[]> {
    const candidates = await this.getCandidate();

    let teams: Team[] = [];

    for (let i = 0; i < candidates.length; i++) {
      await candidates[i].fetchTeam();
      teams.push(candidates[i]);
    }

    return teams;
  }

  public static autoMigrate(sequelize: Sequelize): void {
    Event.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        status : {
          type: DataTypes.ENUM,
          allowNull : false,
          values: Object.values(EventStatus) 
        },
        image : {
          type : DataTypes.STRING(255),
        },
        eventName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        registration: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        tableName: TableName.events,
        sequelize,
        timestamps: false,
        version: true,
      }
    );
  }

  //TODO: add team[] in event attrs
  public toJSON(): IEventResponse {
    const values = { ...this.get() };
    let candidate : ITeamResponse[] = []
    if(this.candidate){
     candidate = this.candidate.map(c => c.toJSON())
    }

    return { ...values , candidate };
  }
}

export { Event };
