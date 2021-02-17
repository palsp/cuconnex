import { app } from './app'
import { sequelize } from './db'
import { User } from './models/user.model';
import { Interest } from './models/interest.model';
import { UserInterest } from './models/user-interest.model'


// describe relation between table
User.belongsToMany(Interest, { through: UserInterest.tableName })
Interest.belongsToMany(User, { through: UserInterest.tableName, sourceKey: "interest", foreignKey: "interest" })



const start = async () => {
    try {
        await sequelize.sync();
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000...')
    })

}



start();