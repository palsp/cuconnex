import { FriendStatus } from '@cuconnex/common';
import { app } from './app'
import { initializeDB } from './db'
import { User } from './models/user.model';
import { Friend } from './models/friend.model';
import { TableName } from './models/types'


const validateEnvAttr = () => {

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


    try {
        // check if all required env variable have been declared
        // validateEnvAttr();
        await initializeDB();

        const user1 = await User.create({ id: "6131886621", name: "pal" });
        const user2 = await User.create({ id: "6131776621", name: "bob" });

        await user1.addFriend(user2);
        const frd = await user1.getFriend({ joinTableAttributes: { exclude: ['senderId'] } });

        console.log(frd[0].friends)

    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000..')
    })

}



start();