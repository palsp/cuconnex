import { app } from './app';
import { initializeDB } from './db';
import { startDB } from './models/initDB'
import { User } from './models/user.model';
import { Interest } from './models/interest.model';
import { InterestDescription, Technology } from '@cuconnex/common';
// import { startInterest } from './models/initDB';
import { fromPairs } from 'lodash';
import { UserInterest } from './models/UserInterest.model';
import { Category } from './models/category.model';

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



    // const category = await Category.create({ category: "Technology" });
    // // const int = await Interest.create({ description: Technology.ChatBot });


    // category.createInterest({ description: Technology.Coding });


    // await startInterest();

    await startDB();
  } catch (err) {
    console.log(err);
  }



  app.listen(3000, () => {
    console.log('Listening on port 3000..');
  });
};

start();
