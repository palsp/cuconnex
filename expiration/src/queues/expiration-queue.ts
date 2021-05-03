import Queue from 'bull';
import { EventEndPub } from '../events/publisher/event-end-pub'
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
    new EventEndPub(natsWrapper.client).publish({
        // orderId: job.data.orderId,
        id : job.data.id
    })
});


export { expirationQueue }