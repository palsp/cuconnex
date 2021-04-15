import express from 'express';
import { json } from 'body-parser';
import session from 'cookie-session';
import { searchRouter } from './routes/search.routes';

const app = express();

app.use(json());

app.use(
    session({
        signed: false,
        secure: false,
        // httpOnly : true,
    })
);


app.use("/api/query", searchRouter);





export { app }