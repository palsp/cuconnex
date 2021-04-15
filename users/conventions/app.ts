import express from 'express';
import { SomeRouter } from './routes/example.routes'

const app = express();


// group router with some end point
app.use("/api/example", SomeRouter)



export { app };