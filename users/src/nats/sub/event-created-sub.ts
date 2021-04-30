import { Event } from '../../models';
import { Listener, EventCreated, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';


export class EventCreatedSub extends Listener<EventCreated> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EventCreated;

  async onMessage(data: EventCreated['data'], msg: Message) {
      await Event.create({
        id : data.id,
        eventName : data['event-name'],
        registration : data.registration,

      });
      
      msg.ack();
  }
}
