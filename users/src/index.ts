import { app } from './app'
import { sequelize } from './db'
import { User } from './models/user.model';
import { Interest } from './models/interest.model';
import { InterestDescription } from '@cuconnex/common'
import { newUserRouter } from './routes/new-user';




User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });


const interests = [InterestDescription.Business, InterestDescription.Developer,]
const start = async () => {


    let createSuccess = false;
    let user;
    try {
        await sequelize.sync({ force: true });
        //     user = await User.create({ id: "6131886621", name: "Pal" });
        //     for (let i = 0; i < interests.length; i++) {
        //         if (i === 1) {
        //             throw new Error('Some thing went wrong')
        //         }

        //         await user.createInterests({ interest: interests[i] });
        //     }
        //     createSuccess = true;

    } catch (err) {
        console.error(err);
    }

    // if (!createSuccess) {
    //     if (user) {
    //         await user.destroy();
    //     }
    // }
    app.listen(3000, () => {
        console.log('Listening on port 3000...')
    })

}



start();