import request from 'supertest';
import { app } from '../../../app';
import { User, Event } from '../../../models';
import { Business } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';
import { EventStatus } from '@cuconnex/common/build/db-status/event';

const setup = async () => {
  const event = await Event.create({ id: 1, status : EventStatus.ongoing  , eventName: 'testEvent', registration: true });
  const event2 = await Event.create({ id: 2, status : EventStatus.ongoing, eventName: 'testEvent2', registration: true });

  const user = await User.create({ id: '6131707021', name: 'bird' });
  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });
  await user.addInterest(interest!);
  const team = await user.createTeams({ name: 'testTeam', description: '' });

  return { user, team, event, event2, interest };
};

describe('Get List of Events', () => {
  it('should return 404 if the team is not found.', async () => {
    const { user } = await setup();

    const res = await request(app)
      .get(`/api/teams/events/xxx`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(404);

    expect(res.body.errors[0].message).toEqual('TeamNot Found');
  });

  it('should return 200 if get list of events successfully.', async () => {
    const { user, team, event, event2 } = await setup();

    await team.register(event);
    await team.register(event2);

    const res = await request(app)
      .get(`/api/teams/events/${team.name}`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.body.length).toEqual(2);
    expect(res.body.events[0].eventName).toEqual(event.eventName);
    expect(res.body.events[1].eventName).toEqual(event2.eventName);
  });
});
