import express from 'express';
import { json } from 'body-parser';
import session from 'cookie-session';
import cors from 'cors';
require('express-async-errors');
import { searchRouter } from './routes/search.routes';

const app = express();

app.use(json());

app.use(cors())

app.use(
    session({
        signed: false,
        secure: false,
        // httpOnly : true,
    })
);


app.use("/api/query", searchRouter);





export { app }