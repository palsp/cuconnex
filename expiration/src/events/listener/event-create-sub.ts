import { Listener, EventCreated, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue'

export class EventCreatedSub extends Listener<EventCreated> {
    readonly subject = Subjects.EventCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: EventCreated['data'], msg: Message) {
        const delay = new Date(data.endDate).getTime() - new Date().getTime();
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