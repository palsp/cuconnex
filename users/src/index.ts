import { app } from './app';
import { initializeDB } from './db';
import { User } from './models/user.model';
import { Interest } from './models/interest.model'
import { InterestDescription } from '@cuconnex/common';

const validateEnvAttr = () => {
  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST must be defined');
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
};

const start = async () => {
  try {
    // check if all required env variable have been declared
    // validateEnvAttr();
    await initializeDB();

    const user = await User.create({ id: "6131886621", username: "pallll" })
    const interest = await Interest.create({ description: InterestDescription.Business });


  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000..');
  });
};

start();
