import { Listener, EventExpirationStart, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue'

export class EventExpirationSub extends Listener<EventExpirationStart> {
    readonly subject = Subjects.Expiration;
    queueGroupName = queueGroupName;

    async onMessage(data: EventExpirationStart['data'], msg: Message) {
        console.log('exp' , data.expirationDate);
        console.log('expiration' , new Date(data.expirationDate).toUTCString())
        console.log('now' , new Date().toString())
        console.log('now UTC' , new Date().toUTCString())

        const delay = new Date(data.expirationDate).getTime() - new Date().getTime();
        console.log(`Waiting ${delay} milliseconds to process the job`)
        await expirationQueue.add({
            id : data.id
        },
            {
                delay,
            }
        );

        msg.ack();
    }
}   