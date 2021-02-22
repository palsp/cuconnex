import { Optional } from 'sequelize';
import { Table, Model, Column, BelongsToMany, PrimaryKey } from 'sequelize-typescript';
import User from './user.model';
import UserRoles from './userRoles.model';
interface RoleAttributes {
    id?: number;
    name: string;
}
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {
    id: number;
    name: string;
 }

@Table
export default class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    
    @PrimaryKey
    @Column 
    id!: number;
    
    @Column
    name!: string;

    @BelongsToMany(() => User, () => UserRoles)
    users?: User[];
 }