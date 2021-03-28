import { initUser } from './user.model';
import { initTeam } from './team.model';
import { initMember } from './member.model';
import { initInterests } from './interest.model';
import { initFriend } from './friend.model';
import { Sequelize, DataTypes } from 'sequelize';
import { FriendStatus, InterestDescription, TeamStatus } from '@cuconnex/common';
import { TableName } from '../models/types';
import { initUserInterest, UserInterest } from './UserInterest.model';
import { initCategory } from './category.model';

export const initModel = (sequelize: Sequelize) => {
  const User = initUser(sequelize);
  const Interest = initInterests(sequelize);
  const Team = initTeam(sequelize);
  const Category = initCategory(sequelize);
  const Member = initMember(sequelize);

  // A.hasOne(B, { /* options */ });      one-to-one foreign key in B
  // A.belongsTo(B, { /* options */ });   one-to-one  foreign key in A
  // A.hasMany(B, { /* options */ });     one-to-many foreign key in B
  // A.belongsToMany(B, { through: 'C', /* options */ });   many-to-many

  // definde relation for friend
  const frd = sequelize.define(
    TableName.friends,
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

  const userInterest = sequelize.define(
    TableName.userInterest,
    {
    },
    { timestamps: false }
  );


  Category.hasMany(Interest, {
    sourceKey: "id",
    as: "interests",
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });


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
  // // sync Userinterest model with user-interest relation
  // initUserInterest(sequelize);

  initUserInterest(sequelize);

  User.belongsToMany(User, {
    as: 'friend',
    through: frd,
    foreignKey: 'senderId',
    otherKey: 'receiverId'
  });

  User.hasMany(Team, {
    sourceKey: 'id',
    foreignKey: 'creatorId',
    as: 'teams',
    onDelete: 'CASCADE'
  });

  // M-M
  Team.belongsToMany(User, { through: member });
  User.belongsToMany(Team, { through: member, as: 'member' });

  initFriend(sequelize);
};
