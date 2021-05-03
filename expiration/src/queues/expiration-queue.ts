import Queue from 'bull';
import { EventCompletedPub } from '../events/publisher/expiration-complete-pub'
import { natsWrapper } from '../nats-wrapper';

interface Payload {
    id : number,
}


const expirationQueue = new Queue<Payload>('event:ended', {
    redis: {
        host: process.env.REDIS_HOST 
    }
});


expirationQueue.process(async (job) => {
    console.log("I want to publish an expiration:  for event id", job.data.id)
    new EventCompletedPub(natsWrapper.client).publish({
        id : job.data.id
    })
});


export { expirationQueue }