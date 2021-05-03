import { Listener, EventExpirationStart, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue'

export class EventExpirationSub extends Listener<EventExpirationStart> {
    readonly subject = Subjects.Expiration;
    queueGroupName = queueGroupName;

    async onMessage(data: EventExpirationStart['data'], msg: Message) {
        console.log(new Date(data.expirationDate).toString())
        console.log(new Date().toString())
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