import { natsWrapper } from './nats-wrapper'
import { EventExpirationSub } from './events/listener/event-create-sub'

process.env.NATS_CLIENT_ID = "4567"
process.env.NATS_URL = "http://localhost:4222"
process.env.NATS_CLUSTER_ID = "connex";
process.env.REDIS_HOST  = "http://localhost:6379"

const start = async () => {

    // detect immediately if the secret key is not defined

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }


    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }


    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error(' NATS_CLUSTER_ID must be defined');
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)

        natsWrapper.client.on('close', () => {
            console.log('NATs connection close');
            process.exit();
        })

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new EventExpirationSub(natsWrapper.client).listen();

    } catch (err) {
        console.log(err);
    }
}

start();

