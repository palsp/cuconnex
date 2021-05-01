import { DataTypes, Model, Sequelize } from 'sequelize';
import { TableName } from './types';
import { BelongsToManyGetAssociationsMixin } from 'sequelize';
import { Team } from './team.model';
import { IEventResponse } from '../interfaces/event';

interface EventAttrs {
  id: number;
  eventName: string;
  registration: boolean;
  version?: number;
}

interface EventCreationAttrs {
  id: number;
  eventName: string;
  registration: boolean;
}

class Event extends Model<EventAttrs, EventCreationAttrs> {
  public id!: number;
  public eventName!: string;
  public registration!: boolean;

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
    return { ...values };
  }
}

export { Event };
