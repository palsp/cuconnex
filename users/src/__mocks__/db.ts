import { Sequelize } from 'sequelize';
import { test_config } from '../config/db.config'


export const sequelize = new Sequelize(test_config.db, test_config.user, test_config.password, {
    host: test_config.host,
    dialect: "mysql",
    logging: false,
})