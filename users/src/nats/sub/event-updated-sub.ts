import { Event, Team, Rating } from '../../models';
import { Listener, EventUpdated, Subjects, EventStatus } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';



export class EventUpdatedSub extends Listener<EventUpdated> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EventUpdated;

  async onMessage(data: EventUpdated['data'], msg: Message) {
    console.log("message received" , data);
    const event = await Event.findOne({ where : { id : data.id , version : data.version - 1 } , include : [{ model : Team , as: 'candidate' }]});
    
    if(!event){
        throw new Error('Event not found')
    }

    event.eventName = data['event-name'];
    event.registration = data.registration;
    event.status = data.status;
    event.image = data.image;
    
    await event.save();
    
    if(event.status === EventStatus.closed){
      for(let team of event.candidate!){
        await Rating.addRateNotification(team)
    }
    
    }

    msg.ack();
  }
}
