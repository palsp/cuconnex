import { app } from './app'
import { initializeDB } from './db'

const start = async () => {


    try {
        await initializeDB();

    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000...........')
    })

}



start();