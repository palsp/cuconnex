import { Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { User } from './user.model';
import { Role } from './role.model';

@Table
export class UserRoles extends Model<UserRoles> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Role)
    @Column
    roleId!: string;
}
}