import { app } from './routes/app';
import { initializeDB } from './db';


const port = process.env.PORT || 3000


const start = async () => {
    try {
        await initializeDB();
    } catch (err) {
        console.log(err);
    }


    app.listen(port, () => console.log(`App listening on port ${port}`))

}


start();
