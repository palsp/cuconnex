import { Sequelize } from 'sequelize';
import config from './config/db.config';

export const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    port: 3306,
    dialect: "mysql",
});

