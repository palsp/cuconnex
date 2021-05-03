import { Event , Rating, Team} from '../../models';
import { Listener, EventEnd, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';


export class EventEndSub extends Listener<EventEnd> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EventEnded;

  async onMessage(data: EventEnd['data'], msg: Message) {
    console.log('message received from subject', this.subject , data)
    // create rating notification
    const event = await Event.findOne({
      where : { id : data.id } , 
      include : { 
        model : Team ,
        as : 'candidate',
      }
    });


    if(!event){
        throw new Error('event not found');
    }
      
    for(let team of event.candidate!){
        await Rating.addRateNotification(team)
    }

    msg.ack();
  }
}
