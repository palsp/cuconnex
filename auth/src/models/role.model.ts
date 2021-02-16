import { Optional } from 'sequelize';
import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRoles } from './userRoles.model';
interface RoleAttributes {
    id?: number;
    name: string;
}
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {
    id: number;
    name: string;
 }

@Table
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @Column 
    id!: number;
    
    @Column
    name!: string;

    @BelongsToMany(() => User, () => UserRoles)
    users?: User[];
 }