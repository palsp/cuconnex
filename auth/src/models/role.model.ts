import { Model, BuildOptions } from "sequelize/types";

interface RoleModel extends Model {
    id: number;
    name: string;
    
}

// Need to declare the static model so `findOne` etc. use correct types.
export type RoleModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): RoleModel;
}


module.exports = (sequelize, Sequelize) => {
    const Role = <RoleModelStatic>sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Role;
};