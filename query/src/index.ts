import { app } from './app';



const start = () => {
    // if (!process.env.USER_SRV_ENDPOINT) {
    //     throw new Error('USER_SRV_ENDPOINT must be defined')
    // }

    // if (!process.env.EVENT_SRV_ENDPOINT) {
    //     throw new Error('EVENT_SRV_ENDPOINT must be defined')
    // }

    app.listen(3000, () => {
        console.log('Listening on port 3000 .......')
    })

}


start();
