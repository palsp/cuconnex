import { Sequelize } from 'sequelize';
import config from './config/db.config';

const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    port: 3306,
    dialect: "mysql",
});

export { sequelize };

