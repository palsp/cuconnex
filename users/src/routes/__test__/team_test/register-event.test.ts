import request from 'supertest';
import { app } from '../../../app';
import { User, IsMember, Event, Candidate } from '../../../models';
import { Business, TeamStatus } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';

const setup = async () => {
  const event = await Event.create({ id: 1, eventName: 'testEvent', registration: true });

  const user = await User.create({ id: '6131707021', name: 'bird' });
  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });
  await user.addInterest(interest!);
  const team = await user.createTeams({ name: 'testTeam', description: '' });

  return { user, team, event, interest };
};

describe('Register Event', () => {
  it('should return 400 if the some input is missing.', async () => {
    const { user, team, event } = await setup();

    await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(400);

    await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({ teamName: 'xxx' })
      .expect(400);

    await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({ eventId: 1 })
      .expect(400);
  });

  it('should return 404 if the team provided is not found.', async () => {
    const { user, team, event } = await setup();

    const res = await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({ teamName: 'xxx', eventId: event.id })
      .expect(404);

    expect(res.body.errors[0].message).toEqual('TeamNot Found');
  });

  it('should return 404 if the event provided is not found.', async () => {
    const { user, team, event } = await setup();

    const res = await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({ teamName: team.name, eventId: 0 })
      .expect(404);
    expect(res.body.errors[0].message).toEqual('EventNot Found');
  });

  it('should return 400 if the requester is not the creator of the team requested.', async () => {
    const { team, event, interest } = await setup();

    const user2 = await User.create({ id: '6131707022', name: 'bird2' });

    await user2.addInterest(interest!);

    const res = await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user2.id))
      .send({ teamName: team.name, eventId: 1 })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('The requester is not the team creator.');
  });

  it('should return 400 if the team is already register for this event.', async () => {
    const { user, team, event } = await setup();

    await Candidate.create({ eventId: event.id, teamName: team.name });

    const res = await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({ teamName: team.name, eventId: event.id })
      .expect(400);
    expect(res.body.errors[0].message).toEqual('This team already register for this event.');
  });

  it('should return 200 if register event successfully.', async () => {
    const { user, team, event } = await setup();

    const res = await request(app)
      .post('/api/teams/events/register')
      .set('Cookie', global.signin(user.id))
      .send({ teamName: team.name, eventId: event.id })
      .expect(200);

    const isCandidate = await Candidate.findOne({
      where: { eventId: event.id, teamName: team.name },
    });

    expect(isCandidate!.eventId).toEqual(event.id);
    expect(isCandidate!.teamName).toEqual(team.name);
    expect(isCandidate!.status).toEqual(true);
  });
});
