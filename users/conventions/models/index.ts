import { Sequelize } from "sequelize/types"
import { CustomModel } from "./cutom.model"


export const autoMigrate = (sequelize: Sequelize) => {
    // model initialization 
    CustomModel.autoMigrate(sequelize);
}