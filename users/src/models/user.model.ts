
import { FriendStatus } from '@cuconnex/common';
import { Model, DataTypes, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, Association, Sequelize, } from 'sequelize'
import { Interest, InterestCreationAttrs } from './interest.model'




// All attributes in user model
interface UserAttrs {
    id: string;
    name: string;
    friends?: User[];
}

interface UserCreationAttrs {
    id: string,
    name: string;
}


class User extends Model<UserAttrs, UserCreationAttrs>  {
    public id!: string;
    public name!: string;
    public friends?: User[];


    public createInterest!: HasManyCreateAssociationMixin<Interest>
    public getInterests!: HasManyGetAssociationsMixin<Interest>
    public addFriend!: BelongsToManyAddAssociationMixin<User, { status: FriendStatus }>
    public getFriend!: BelongsToManyGetAssociationsMixin<User>;

    public createInterests(attrs: InterestCreationAttrs) {
        return this.createInterest({ description: attrs.description });
    }

    public async createInterestsFromArray(interests: InterestCreationAttrs[]) {
        for (let interest of interests) {
            await this.createInterests(interest)
        }
    }



    public static associations: {
        interests: Association<User, Interest>;
        friend: Association<User, User>;
    }
}



const initUser = (sequelize: Sequelize) => {
    User.init<User>(
        {
            id: {
                type: DataTypes.STRING(11),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: new DataTypes.STRING(255),
                allowNull: false
            }

        },
        {
            tableName: "users",
            sequelize,
        }
    );

    return User;
}





export { User, initUser }