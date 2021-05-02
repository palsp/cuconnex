import { app } from './app';
import { initializeDB } from './db';
import { startDB } from './models/initDB';
import { Event, Recommend, Team, User } from './models';
import { natsWrapper, EventCreatedSub , EventUpdatedSub} from './nats';
import { init } from './data/dummy';
import { NotFoundError, TeamStatus } from '@cuconnex/common';
import { includes } from 'lodash';
import { convertCompilerOptionsFromJson } from 'typescript';


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

    // const event = await Event.findOne({ where : { id : 1} , include : [{ model : Team , as : "candidate", include : ['owner','member'] , attributes : ["teamName"]}]})
    // const event = await Event.findOne({
    //   where : { id : 1 } , 
    //   include : { 
    //     model : Team ,
    //     as : 'candidate',
    //     // where : { id : "6131776121"}
    //     attributes : { include : ["name"] },
        
    //     include : [
    //         { model : User, as: 'owner', attributes :  ["id"] , include : [{ model : User , as : "recommendation" , attributes : ["id"] , where : { id : "6131776121"}}]},
    //         {model : User, as : 'member' , attributes : ["id"] , include : [{ model : User , as : "recommendation" , attributes : ["id"] , where : { id : "6131776121"}}]}
    //     ]
    //   }
    // })
     // @ts-ignore
    // console.log("🚀 ~ file: index.ts ~ line 76 ~ start ~ event", event!.candidate![0].member![0].id , event!.candidate![0].member![0].recommendation!)
    // @ts-ignore

    // const event = await Event.findOne({
    //   where : { id : 1 } , 
    //   include : { 
    //     model : Team ,
    //     as : 'candidate',
    //     // where : { id : "6131776121"}
    //     attributes : { include : ["name"] },
        
    //     include : [
    //         { model : User, as: 'owner', attributes :  ["id"] , include : [{ model : User , as : "recommendation" , through : { attributes : ["score"]}}]},
    //         { model : User, as : 'member' , attributes : ["id"] , include : [{ model : User , as : "recommendation" , through : {attributes : ["score"]}}]}
    //     ]
    //   }
    // })
    // console.log("🚀 ~ file: index.ts ~ line 108 ~ start ~ event", event?.candidate![0].member)

    const team = await Team.findOne({ 
      where : { name : "test_team_0"},
      include : [
        { model : User , as : 'member' , attributes :["id"], include : [{model : User , as : "recommendation" , where : { id : "6131776321"} , attributes :["id"] , through : { attributes : ["score"]}}]},
        { model : User , as : 'owner'  , attributes : ["id"], include : [{model : User , as : "recommendation" , where : { id : "6131776321"} , attributes : ["id"] ,through : { attributes : ["score"]}}] },
      ]
    })
    if(!team){
      throw new Error('not found')
    }
    // console.log("🚀 ~ file: index.ts ~ line 118 ~ start ~ team", team.owner!.recommendation!)

    let meanScore;
    const ownerRecommend = team.owner!.recommendation;
    if(!ownerRecommend){
      meanScore = 0
    }else{
      meanScore = ownerRecommend[0].Recommend!.score
    }

    for(let member of team.member!){
      const MemberRecommend = member.recommendation
      if(!MemberRecommend){
        meanScore += 0
      }else{
        meanScore += MemberRecommend[0].Recommend!.score
      }
    }

    console.log(meanScore / ( team.member!.length + 1))
    console.log(await team.CalculateUserScore("6131776321"));
    
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

