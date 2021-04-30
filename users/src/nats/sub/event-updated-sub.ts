import { Event } from '../../models';
import { Listener, EventUpdated, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';


export class EventUpdatedSub extends Listener<EventUpdated> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EventUpdated;

  async onMessage(data: EventUpdated['data'], msg: Message) {
    console.log("message received" , data);
    const event = await Event.findOne({ where : { id : data.id , version : data.version - 1}});
    
    if(!event){
        throw new Error('Event not found')
    }

    event.eventName = data['event-name'];
    event.registration = data.registration;
      
    await event.save();

    msg.ack();
  }
}
