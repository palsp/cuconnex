import { app } from './app';
import { initializeDB } from './db';
import config from './config/db.config';
import { startDB } from './models/initDB';
import { natsWrapper, EventCreatedSub , EventUpdatedSub} from './nats';
import { init } from './data/dummy';
import { Team , IsMember , User , Interest} from './models';
import { includes } from 'lodash';
import { Recommend } from './models/recommend.model';
import { Technology } from '@cuconnex/common';

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

    await init();

    const coding = await Interest.findOne({ where : { description : Technology.Coding}});
    
    const like  = await coding!.getLike()
    console.log("🚀 ~ file: index.ts ~ line 79 ~ start ~ like", like)
    
    const team = await Team.findOne({ where : { name : "test_team_0"} , include : ['owner' , 'member']});

    let users = await User.findAll();

    let result:  number[] = []
  
    for(let user of users){
      const isMember = await team!.findMember(user.id);
      let score: number;
      if(!isMember){
        score = await team!.CalculateUserScore(user.id);
        result.push(score);
      }
    }
  
    // sort by score
    result.sort((a , b) => a - b);
    console.log(result)


    // const recommend = await Recommend.findOne({ where : { userId : team!.owner!.id , recommenderId : "6131886921"}}) 
    // let meanScore = recommend ? recommend.score : 0 ;

    // if(team!.member){
    //   for(let m of team!.member){
    //     const recommend = await Recommend.findOne({ where : { userId : m.id , recommenderId : "6131886921"}}) 
    //     const added =  recommend ? recommend.score : 0 ;
    //     meanScore += added;
    //   }
    //   meanScore = meanScore / (team!.member.length + 1)
    // }
    // console.log('old',meanScore);
    // meanScore = await team!.CalculateUserScore("6131886921");
    // console.log("🚀 ~ file: index.ts ~ line 92 ~ start ~ meanScore", meanScore)


    // const team2 = await Team.findOne({ where : { name : "test_team_0"} , include : ['owner' , 'member']});

    // const recommend2 = await Recommend.CalculateScore(team2!.owner!.id , "6131886921" )

    // meanScore = recommend2 ;

    // if(team!.member){
    //   for(let m of team!.member){
    //     const added = await Recommend.CalculateScore(m.id ,"6131886921") 
    //     meanScore += added;
    //   }
    //   meanScore = meanScore / (team!.member.length + 1)
    // }
    // console.log(meanScore);


  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();

