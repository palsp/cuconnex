import { app } from './app';
import { initializeDB } from './db';
import { startDB } from './models/initDB';
// TODO: removed before deploy
import { randomBytes } from 'crypto';
import { natsWrapper, EventCreatedSub } from './nats';



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

const start = async () => {
  // check if all required env variable have been declared
  // validateEnvAttr();

  try {


    await natsWrapper.connect("connex",randomBytes(4).toString('hex'),"http://localhost:4222")


    natsWrapper.client.on('close', () => {
      console.log('NATs connection close');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new EventCreatedSub(natsWrapper.client).listen();

    await initializeDB();

    // initial data for interest and category 
    // it should be run only once
    // await startDB();


  } catch (err) {
    console.log(err);
  }

  // TODO: Change back to port 3000
  app.listen(3001, () => {
    console.log('Listening on port 3000');
  });
};

start();

