import { app } from './app';
import { initializeDB } from './db';
import { startDB } from './models/initDB';
import { natsWrapper, EventCreatedSub , EventUpdatedSub, EventEndSub} from './nats';
import { init , createDummyUser , createTeamForDummyUsers} from './data/dummy';
import { Event, Rating, Team , User } from './models';


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

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
}


if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
}


if (!process.env.NATS_CLUSTER_ID) {
    throw new Error(' NATS_CLUSTER_ID must be defined');
}
};

process.env.NATS_CLUSTER_ID = "connex";
process.env.NATS_CLIENT_ID = "1532"
process.env.NATS_URL = "http://localhost:4222"

const start = async () => {
  // check if all required env variable have been declared
  // validateEnvAttr();
  try {


    await natsWrapper.connect(process.env.NATS_CLUSTER_ID!, process.env.NATS_CLIENT_ID!, process.env.NATS_URL!)


    natsWrapper.client.on('close', () => {
      console.log('NATs connection close');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new EventCreatedSub(natsWrapper.client).listen();
    new EventUpdatedSub(natsWrapper.client).listen();
    new EventEndSub(natsWrapper.client).listen();

    await initializeDB();

    // initial data for interest and category 
    // it should be run only once
    await startDB();
    const users = await createDummyUser();
    const teams = await createTeamForDummyUsers(users);
    // TODO: delete dummy data 
    // await init();
    process.env.NATS_URL
  } catch (err) {
    console.log(err);
  }

  // TODO: Change back to 3000
  app.listen(3001, () => {
    console.log('Listening on port 3001');
  });
};

start();

