import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
// import { Subjects } from '@cuconnex/common';

console.clear();

const stan: nats.Stan = nats.connect('connex', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS.');

    const data = {
        subject: 'friend:added',
        data: {
            sid: 'abc123'
        }
    }

    stan.publish('friend:added', JSON.stringify(data), () => {
        console.log('event published');
    });
});