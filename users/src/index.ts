import express from 'express';
import { sequelize } from './db'
import { User } from './models/user.model';
import { Interest } from './models/interest.model';
import { InterestDescription } from '@cuconnex/common'



const app = express();





// User.hasMany(Interest, { foreignKey: "userId" });
// Interest.belongsTo(User)

const dostuff = async () => {
    const user = await User.create({ name: "Pal" })

    // await user.createInterest({ interest: InterestDescription.Developer })

    return;
}


sequelize.sync({ force: true }).then(res => {
    console.log('Connecting to db!!!')
})
    .then(() => dostuff())
    .then(res => app.listen(3000))
    .catch(err => console.log(err));