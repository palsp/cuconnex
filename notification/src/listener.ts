import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

const stan = nats.connect('connex', randomBytes(4).toString(), {
    url: 'http://localhost:4222'
});