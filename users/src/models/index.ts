import { Sequelize, DataTypes } from 'sequelize';
import { FriendStatus, TeamStatus } from '@cuconnex/common';

import { User } from './user.model';
import { Interest } from './interest.model';
import { TableName } from '../models/types';
import { UserInterest } from './UserInterest.model';
import { Category } from './category.model';
import { Connection } from './connection.model';
import { Team } from './team.model';
import { Member } from './member.model';




// export const initModel = (sequelize: Sequelize) => {
//   const User = initUser(sequelize);
//   const Interest = initInterests(sequelize);
//   const Team = initTeam(sequelize);
//   const Category = initCategory(sequelize);
//   const Member = initMember(sequelize);

//   // A.hasOne(B, { /* options */ });      one-to-one foreign key in B
//   // A.belongsTo(B, { /* options */ });   one-to-one  foreign key in A
//   // A.hasMany(B, { /* options */ });     one-to-many foreign key in B
//   // A.belongsToMany(B, { through: 'C', /* options */ });   many-to-many


//   const member = sequelize.define(
//     TableName.members,
//     {
//       status: {
//         type: DataTypes.ENUM,
//         values: Object.values(TeamStatus),
//         defaultValue: TeamStatus.Pending,
//         allowNull: false
//       }
//     },
//     { timestamps: false }
//   );



//   User.belongsToMany(User, {
//     as: 'friend',
//     through: frd,
//     foreignKey: 'senderId',
//     otherKey: 'receiverId'
//   });

//   User.hasMany(Team, {
//     sourceKey: 'id',
//     foreignKey: 'creatorId',
//     as: 'teams',
//     onDelete: 'CASCADE'
//   });

//   // M-M
//   Team.belongsToMany(User, { through: member });
//   User.belongsToMany(Team, { through: member, as: 'member' });

// };


export const initModel = (sequelize: Sequelize) => {

  // -------------------- User and Interest -----------------------------------
  User.autoMigrate(sequelize);
  Interest.autoMigrate(sequelize);
  Team.autoMigrate(sequelize);


  const userInterest = sequelize.define(
    TableName.userInterest,
    {},
    { timestamps: false }
  );

  // M-M user and interest
  User.belongsToMany(Interest, {
    through: userInterest,
    as: "interests",
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });

  // Interest.belongsToMany(User, {
  //   through: userInterest,
  //   as: "categories",
  //   sourceKey: "category_id",
  //   foreignKey: "category_id"

  // });

  Interest.belongsToMany(User, {
    through: userInterest,
    as: "interests",
    sourceKey: "description",
    foreignKey: "interest",
  });

  UserInterest.autoMigrate(sequelize);

  // -------------------- Interest and Category ----------------------------------- 
  Category.autoMigrate(sequelize);

  Category.hasMany(Interest, {
    sourceKey: "id",
    as: "interests",
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });

  // -------------------- User and User ----------------------------------- 
  // definde relation for connection
  const connection = sequelize.define(
    TableName.connections,
    {
      status: {
        type: DataTypes.ENUM,
        values: Object.values(FriendStatus),
        defaultValue: FriendStatus.Pending,
        allowNull: false
      }
    },
    { timestamps: false }
  );



  User.belongsToMany(User, {
    as: "connection",
    through: connection,
    foreignKey: 'senderId',
    otherKey: 'receiverId'
  });

  Connection.autoMigrate(sequelize);

  // -------------------- User and Team ----------------------------------- 
  const member = sequelize.define(
    TableName.members,
    {
      status: {
        type: DataTypes.ENUM,
        values: Object.values(TeamStatus),
        defaultValue: TeamStatus.Pending,
        allowNull: false
      }
    },
    { timestamps: false }
  );


  User.hasMany(Team, {
    sourceKey: 'id',
    foreignKey: 'creatorId',
    as: 'teams',
    onDelete: 'CASCADE'
  });

  // M-M
  Team.belongsToMany(User, { through: member });
  User.belongsToMany(Team, { through: member, as: 'member' });

  Member.autoMigrate(sequelize);
}
