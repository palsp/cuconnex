import { natsWrapper } from '../../../natsWrapper';
import { EventEndSub } from '../event-end-sub';
import { EventEnd , TeamStatus} from '@cuconnex/common';
import { Event, User , Team , Rating} from '../../../models';

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
    const listener = new EventEndSub(natsWrapper.client)

    const event = await Event.create({
        id : 1,
        eventName : "test_event",
        registration : true
    })

    // create a fake data event
    const data: EventEnd['data'] = {
        id : 1,
    }
    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, event, data, msg }

}
it('add entry in rating table if it not exist', async () => {
    const { listener, event, data, msg } = await setup();
    const users = await createDummyUser(3);
    const team = await createTeamForDummyUsers(users);
    await team.register(event);

    let rates = await Rating.findAll()
    expect(rates.length).toEqual(0);

    await listener.onMessage(data, msg);

    rates = await Rating.findAll()

    expect(rates.length).toEqual(Math.pow(users.length,2) - users.length);
});

it('update entry in rating table if it existed', async () => {
    const { listener, event, data, msg } = await setup();
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

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})