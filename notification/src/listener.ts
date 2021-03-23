import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan: nats.Stan = nats.connect('connex', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('listener connected');

    stan.on('close', process.exit);

    const options: nats.SubscriptionOptions = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setAckWait(1000);
    const subscription = stan.subscribe(
        'friend:added',
        'friendServiceQueueGroup',
        options
    );
    subscription.on('message', (msg: Message) => {
        console.log(`message received: ${msg.getData()}, number: ${msg.getSequence()}`);
        msg.ack();
    });
});

process.on('SIGINT', stan.close);
process.on('SIGTERM', stan.close);