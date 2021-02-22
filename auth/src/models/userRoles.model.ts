import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import User from './user.model';
import Role from './role.model';

interface UserRoleAttributes {
    studentId?: number;
    roleId?: string;
}

@Table
export default class UserRoles extends Model<UserRoleAttributes> {
    @ForeignKey(() => User)
    @Column
    studentId!: number;

    @ForeignKey(() => Role)
    @Column
    roleId!: string;
}
