import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan: nats.Stan = nats.connect('connex', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('listener connected');

    const subscription = stan.subscribe('friend:added');
    subscription.on('message', (msg: Message) => {
        console.log(`message received: ${msg.getData()}`);
    });
});
