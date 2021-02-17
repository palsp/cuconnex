// import { sequelize } from '../db'
// import { Model, DataTypes } from 'sequelize'
// import { InterestDescription } from '@cuconnex/common'




// interface InterestAttrs {
//     id: number;
//     userId: number;
//     interest: InterestDescription,
// }

// interface InterestCreationAttrs {
//     interest: InterestDescription,
// }


// class Interest extends Model<InterestAttrs, InterestCreationAttrs> implements InterestAttrs {
//     // public userId!: number;
//     public id!: number;
//     public userId!: number;
//     public interest!: InterestDescription

// }


// Interest.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true
//     },
//     userId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,

//     },
//     interest: {
//         type: DataTypes.ENUM,
//         values: Object.values(InterestDescription),

//     }
// },
//     {
//         tableName: "interests",
//         sequelize
//     }
// );

// export { Interest };

import { DataType, Model, Optional } from 'sequelize'

interface ProjectAttributes {
    id: number;
    ownerId: number;
    name: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> { }

class Project extends Model<ProjectAttributes, ProjectCreationAttributes>
    implements ProjectAttributes {
    public id!: number;
    public ownerId!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export { Project }