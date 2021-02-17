import { Sequelize } from 'sequelize';

export const db = new Sequelize('users', 'root', 'password', {
    host: 'users-mysql-srv',
    port: 3306,
    dialect: 'mysql',
});

