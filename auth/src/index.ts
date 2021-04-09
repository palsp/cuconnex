import { app } from './routes/app';
import { initializeDB } from './db';


const port = process.env.PORT || 3000

const validateEnvVar = () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY nust be defined');
    }

    if (!process.env.DB_HOST) {
        throw new Error('DB_HOST must be defined');
    }

    if (!process.env.DB_USER) {
        throw new Error('DB_USER must be defined');
    }

    if (!process.env.DB_USER) {
        throw new Error('DB_USER must be defined');
    }

    if (!process.env.DB_SCHEMA) {
        throw new Error('DB_SCHEMA must be defined');
    }

    if (!process.env.DB_SCHEMA) {
        throw new Error('DB_SCHEMA must be defined');
    }

    if (!process.env.DB_PASSWORD) {
        throw new Error('DB_PASSWORD must be defined');
    }

}


const start = async () => {
    // validateEnvVar();
    try {
        await initializeDB();
    } catch (err) {
        console.log(err);
    }

    app.listen(port, () => console.log(`App listening on port ${port}...`))


}


start();
