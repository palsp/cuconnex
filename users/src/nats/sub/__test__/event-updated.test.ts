import { natsWrapper } from '../../../natsWrapper';
import { EventUpdatedSub } from '../event-updated-sub';
import { EventUpdated , TeamStatus} from '@cuconnex/common';
import { Event, User , Team , Rating} from '../../../models';
import { EventStatus } from '@cuconnex/common/build/db-status/event';
import { utimes } from 'node:fs';

const  createDummyUser =  async (num :number) : Promise<User[]> => {
    const users : User[] = [];
    for(let i = 0 ; i < num ; i++){
        users.push(await User.create({
            id : `6131776${i}21`,
            name : `test_user_${i}`
        }))
    }
    return users
}

export const createTeamForDummyUsers = async ( users : User[]) : Promise<Team> => {
    const team = await users[0].createTeams({ name : `test_team` , description : "test team"})
    for(let i = 1 ; i < users.length ; i++){
        await team.addMember(users[i] , { through : { status : TeamStatus.Accept , sender : 'team'}});
    }

    return team;
}

const setup = async () => {
    // create an instance of the listener
    const listener = new EventUpdatedSub(natsWrapper.client)

    const event = await Event.create({
        id : 1,
        eventName : "test_event",
        registration : true,
        status : EventStatus.upcoming,
    })

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, event,  msg }

}

it('should update event status' , async () => {
    const { listener, event,  msg } = await setup();


    // create a fake data event
    const data: EventUpdated['data'] = {
        id : 1,
        "event-name" : "test_event",
        version : 1,
        image : "",
        registration : true,
        status : EventStatus.ongoing,
    }

    await listener.onMessage(data, msg);

    const updatedEvent = await Event.findByPk(event.id);
    expect(updatedEvent!.status).toEqual(EventStatus.ongoing);
});


it('add entry in rating table if it not exist', async () => {
    const { listener, event, msg } = await setup();
    const users = await createDummyUser(3);
    const team = await createTeamForDummyUsers(users);
    await team.register(event);

    let rates = await Rating.findAll()
    expect(rates.length).toEqual(0);


    // create a fake data event
    const data: EventUpdated['data'] = {
        id : 1,
        "event-name" : "test_event",
        version : 1,
        image : "",
        registration : true,
        status : EventStatus.closed,
    }

    await listener.onMessage(data, msg);

    rates = await Rating.findAll()

    expect(rates.length).toEqual(Math.pow(users.length,2) - users.length);
});

it('update entry in rating table if it existed', async () => {
    const { listener, event,  msg } = await setup();
        // create a fake data event
        const data: EventUpdated['data'] = {
            id : 1,
            "event-name" : "test_event",
            version : 1,
            image : "",
            registration : true,
            status : EventStatus.closed,
        }
    
    const users = await createDummyUser(3);
    const team = await createTeamForDummyUsers(users);
    await team.register(event);
    
    await users[0].addRatee(users[1], { through : { rating : 4 , isRate: true }});

    await listener.onMessage(data, msg);

    const rates = await Rating.findAll()

    expect(rates.length).toEqual(Math.pow(users.length,2) - users.length);
    const rate = rates.find(rate => rate.raterId === users[0].id && rate.rateeId === users[1].id)
    expect(rate!.isRate).toEqual(false);
    expect(rate!.rating).toEqual(4);
})

it('not add entry in rating table if updated event is not closed', async () => {
    const { listener, event,  msg } = await setup();
        // create a fake data event
        const data: EventUpdated['data'] = {
            id : 1,
            "event-name" : "test_event",
            version : 1,
            image : "",
            registration : true,
            status : EventStatus.ongoing,
        }
    
    const users = await createDummyUser(3);
    const team = await createTeamForDummyUsers(users);
    await team.register(event);
    

    await listener.onMessage(data, msg);

    const rates = await Rating.findAll()

    expect(rates.length).toEqual(0);
})


it('acks the message', async () => {
    const { listener,  msg } = await setup();

        // create a fake data event
        const data: EventUpdated['data'] = {
            id : 1,
            "event-name" : "test_event",
            version : 1,
            image : "",
            registration : true,
            status : EventStatus.closed,
        }
    

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})