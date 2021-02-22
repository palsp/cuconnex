import express from 'express';
import { db } from './db';


const app = express();


db.sync().then(res => {
    console.log('Connecting to db!!!....')
    app.listen(3000);

}).catch(err => console.log(err))