import { app } from './app';
import { initializeDB } from './db';
import { User } from './models/user.model';
import { Team } from './models/team.model';
import { Interest } from './models/interest.model';
import { InterestDescription } from '@cuconnex/common';

// User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });

// const interests = [InterestDescription.Business, InterestDescription.Developer,]
const start = async () => {
  try {
    // await sequelize.sync({ force: true });
    // //     user = await User.create({ id: "6131886621", name: "Pal" });
    // //     for (let i = 0; i < interests.length; i++) {
    // //         if (i === 1) {
    // //             throw new Error('Some thing went wrong')
    // //         }

    // //         await user.createInterests({ interest: interests[i] });
    // //     }
    // //     createSuccess = true;
    await initializeDB();

    // User.create({ id: '6131707021', name: 'dummyUser' });
    // Team.create({ id: '12345', name: 'dummyTeam });
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  });
};

start();
