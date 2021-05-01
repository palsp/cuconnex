import { DataTypes, Model, Sequelize } from 'sequelize';
import { TableName } from './types';

interface CandidateAttrs {
  eventId: number;
  teamName: string;
  status: boolean;
}

interface CandidateCreationAttrs {
  eventId: number;
  teamName: string;
}

class Candidate extends Model<CandidateAttrs, CandidateCreationAttrs> {
  public eventId!: number;
  public teamName!: string;
  public status!: boolean;

  public static autoMigrate(sequelize: Sequelize): void {
    Candidate.init(
      {
        eventId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        teamName: {
          type: DataTypes.STRING(255),
          primaryKey: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        tableName: TableName.candidates,
        sequelize,
        timestamps: false,
      }
    );
  }
}

export { Candidate };
