import { app } from './app'
import { sequelize } from './db'
import { User } from './models/user.model';
import { Interest } from './models/interest.model';




User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });


const start = async () => {
    try {
        await sequelize.sync({ force: true });
        // const user = await User.create({ name: "Pal" });
        // await user.createInterests({ interest: InterestDescription.Developer })
        // await user.destroy();
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000...')
    })

}



start();