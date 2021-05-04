import { DataTypes, HasManyAddAssociationMixin, Model, Sequelize } from 'sequelize';
import { User } from "./user.model";
import { TableName } from './types';

interface FacultyAttrs {
  code: string;
  name: string;
  image: string;
}

interface FacultyCreationAttrs {
  code: string;
  name: string;
  image: string;
}

class Faculty extends Model<FacultyAttrs, FacultyCreationAttrs> {
  code!: string;
  name!: string;
  image!: string;

  public addEnroll!: HasManyAddAssociationMixin<User , "id">

  public static autoMigrate(sequelize: Sequelize): void {
    Faculty.init(
      {
        code: {
          type: DataTypes.STRING(2),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: TableName.faculty,
        sequelize,
        timestamps: false,
        version: true,
      }
    );
  }

  // public toJSON(): IEventResponse {
  //   const values = { ...this.get() };
  //   let candidate: ITeamResponse[] = [];
  //   if (this.candidate) {
  //     candidate = this.candidate.map((c) => c.toJSON());
  //   }

  //   return { ...values, candidate };
  // }
}

export { Faculty };
