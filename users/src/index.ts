import { app } from './app';
import { initializeDB } from './db';
import { startDB } from './models/initDB';
import { Event, Recommend, Team, User } from './models';
import { natsWrapper, EventCreatedSub , EventUpdatedSub} from './nats';
import { init } from './data/dummy';
import { NotFoundError } from '@cuconnex/common';


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


    // await natsWrapper.connect(process.env.NATS_CLUSTER_ID!, process.env.NATS_CLIENT_ID!, process.env.NATS_URL!)


    // natsWrapper.client.on('close', () => {
    //   console.log('NATs connection close');
    //   process.exit();
    // })

    // process.on('SIGINT', () => natsWrapper.client.close());
    // process.on('SIGTERM', () => natsWrapper.client.close());

    // new EventCreatedSub(natsWrapper.client).listen();
    // new EventUpdatedSub(natsWrapper.client).listen();

    await initializeDB();

    // initial data for interest and category 
    // it should be run only once
    await startDB();

    // TODO: delete dummy data 
    await init();

    // const users = await User.findAll();

    // const user = await User.create({
    //   id : "6131776621",
    //   name : "dummy",
    // })

    // for(let u of users){
    //   await user.addRecommendation(u , { through : { score : (Math.random() * 5).toFixed(2)}})
    // }

    // const event = await Event.findOne({ where : { id : 1} , include : [{ model : Team , as : "candidate", include : ['owner','member']}]})

    // if(!event){
    //   throw new NotFoundError("Event");
    // }

    // let result : number[] = [];

    // for(let team of event.candidate!){
    //   // DO not predict user's team
    //   const isMember = await team.findMember(user.id);
    //   if(isMember){
    //     continue;
    //   }
    //   let score:number;
    //   score = await user!.calculateTeamScore(team)
    //   result.push( score)
    // }

    // result.sort((a,b) => b - a)

    // console.log(result)





  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();

