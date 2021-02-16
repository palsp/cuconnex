import express from 'express';
import { sequelize } from './db';
import { User } from './models/user.model';

const app = express();




sequelize.sync().then(res => {
    console.log('Connecting to db!!!')
    app.listen(3000);

}).catch(err => console.log(err))