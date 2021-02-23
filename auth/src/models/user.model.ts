import { Optional } from 'sequelize';
import { Table, Model, Column, BelongsToMany, PrimaryKey } from 'sequelize-typescript'
import Role from './role.model';
import UserRoles from './userRoles.model';
interface UserAttributes {
    id?: number;
    email: string;
    username?: string;
    password?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    id: number;
    email: string;
    name: string;
    password: string;
 }

@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {
    
    @PrimaryKey
    @Column
    id!: number;
    
    @Column
    email!: string;

    @Column
    username!: string;

    @Column
    password!: string;
    
    @BelongsToMany(() => Role, () => UserRoles)
    roles?: Role[];
 }