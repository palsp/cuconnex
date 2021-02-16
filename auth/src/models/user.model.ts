import { Optional } from 'sequelize';
import { Table, Model, Column, BelongsToMany, PrimaryKey } from 'sequelize-typescript'
import { Role } from './role.model';
import { UserRoles } from './userRoles.model';
interface UserAttributes {
    email: string;
    studentId?: string;
    name: string;
    password?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'studentId' | 'password'> { }

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    

    @Column
    @PrimaryKey
    studentId!: string;
    
    @Column
    email!: string;

    @Column
    name!: string;

    @Column
    password!: string;
    
    @BelongsToMany(() => Role, () => UserRoles)
    roles?: Role[];
 }