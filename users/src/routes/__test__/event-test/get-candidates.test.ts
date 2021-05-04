import request from 'supertest';
import { app } from '../../../app';
import { User, Event } from '../../../models';
import { Business } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';
import { EventStatus } from '@cuconnex/common/build/db-status/event';

const setup = async () => {
  const event = await Event.create({ id: 1, status : EventStatus.ongoing ,eventName: 'testEvent', registration: true });

  const user = await User.create({ id: '6131707021', name: 'bird' });
  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });
  await user.addInterest(interest!);
  const team = await user.createTeams({ name: 'testTeam', description: '' });
  const team2 = await user.createTeams({ name: 'testTeam2', description: '' });

  return { user, team, team2, event, interest };
};

describe('Get List of Teams', () => {
  it('should return 404 if the event is not found.', async () => {
    const { user } = await setup();

    const res = await request(app)
      .get(`/api/teams/events/candidates/0`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(404);

    expect(res.body.errors[0].message).toEqual('EventNot Found');
  });

  it('should return 200 if get list of teams successfully.', async () => {
    const { user, team, team2, event } = await setup();

    await team.register(event);
    await team2.register(event);

    const res = await request(app)
      .get(`/api/teams/events/candidates/${event.id}`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.body.teams.length).toEqual(2);
    expect(res.body.teams[0].name).toEqual(team.name);
    expect(res.body.teams[1].name).toEqual(team2.name);
  });
});
