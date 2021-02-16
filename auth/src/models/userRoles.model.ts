import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import User from './user.model';
import { Role } from './role.model';

@Table
export default class UserRoles extends Model<UserRoles> {
    @ForeignKey(() => User)
    @Column
    studentId!: number;

    @ForeignKey(() => Role)
    @Column
    roleId!: string;
}
