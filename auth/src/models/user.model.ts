import { Optional } from 'sequelize';
import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript'
import { Role } from './role.model';
import { UserRoles } from './userRoles.model';
interface UserAttributes {
    id?: number;
    studentId?: string;
    name: string;
    password?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'studentId' | 'password'> { }

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column
    id!: number;

    @Column
    studentId!: string;

    @Column
    name!: string;

    @Column
    password!: string;
    
    @BelongsToMany(() => Role, () => UserRoles)
    roles?: Role[];
 }