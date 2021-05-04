import { Event } from '../../models';
import { Listener, EventCreated, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';


export class EventCreatedSub extends Listener<EventCreated> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EventCreated;

  async onMessage(data: EventCreated['data'], msg: Message) {
    console.log('message received from subject', this.subject , data)
    
    const event = await Event.findOne({ where : { id : data.id}});

    if(event){
      await event.destroy();
    }
    try{
      await Event.create({
         id : data.id,
         eventName : data['event-name'],
         status : data.status,
         registration : data.registration,
       });
    }catch (e){
      console.error(e);
    }
      msg.ack();
  }
}
