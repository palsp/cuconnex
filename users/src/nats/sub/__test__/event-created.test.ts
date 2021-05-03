import { natsWrapper } from '../../../natsWrapper';
import { EventCreatedSub  } from '../event-created-sub';
import { EventCreated } from '@cuconnex/common';
import { Event } from '../../../models';
import { EventStatus } from '@cuconnex/common/build/db-status/event';

const setup = async () => {
    // create an instance of the listener
    const listener = new EventCreatedSub(natsWrapper.client)

    // create a fake data event
    const data: EventCreated['data'] = {
        id : 1,
        "event-name" : "test_event",
        registration : true,
        endDate : (new Date()).toString(),
        status : EventStatus.ongoing,
    }
    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, data, msg }

}

it('should create an event' , async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const event = await Event.findByPk(data.id);

    expect(event).toBeDefined();
    expect(event!.eventName).toEqual(data['event-name']);
    expect(event!.registration).toEqual(data.registration);

});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage function with the data object + messge object

    await listener.onMessage(data, msg);

    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled()
});

