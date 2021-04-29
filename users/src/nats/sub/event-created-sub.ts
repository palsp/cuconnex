// import { Listener, ExpirationCompleteEvent, Subjects, OrderStatus } from '@palspticket/common';
import { Listener, EventCreated, Subjects } from '@cuconnex/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';

export class EventCreatedSub extends Listener<EventCreated> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.EventCreated;

  // TODO: save to event databasa
  async onMessage(data: EventCreated['data'], msg: Message) {
    console.log(data);
    msg.ack();
  }
}
