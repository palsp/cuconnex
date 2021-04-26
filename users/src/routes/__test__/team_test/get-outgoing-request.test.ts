import request from 'supertest';
import { app } from '../../../app';
import { User, Interest } from '../../../models';
import { Business, TeamStatus } from '@cuconnex/common';

describe('Get Outgoing Requests', () => {
  it('should return "Team not found! if team is not found', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });
    const res = await request(app)
      .get('/api/teams/outgoingrequests/notExistTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 400 if the team has no member', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });

    await user.addInterest(interest!);
    await user.createTeams({ name: 'testTeam', description: '' });

    const res = await request(app)
      .get('/api/teams/outgoingrequests/testTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('This team has no member');
  });

  it('should return 200 if successfully get outgoing requests', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });

    const user2 = await User.create({
      id: '6131707021',
      name: 'test-user2',
    });

    const user3 = await User.create({
      id: '6431707021',
      name: 'test-user3',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });

    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'testTeam', description: '' });
    await team.addAndAcceptMember(user);

    await team.inviteMember(user2);
    await team.inviteMember(user3);

    const res = await request(app)
      .get('/api/teams/outgoingrequests/testTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.body.teamName).toEqual(team.name);
    expect(res.body.outGoingRequests[0].user.id).toEqual(user2.id);
    expect(res.body.outGoingRequests[0].status).toEqual(TeamStatus.Pending);

    expect(res.body.outGoingRequests[1].user.id).toEqual(user.id);
    expect(res.body.outGoingRequests[1].status).toEqual(TeamStatus.Accept);

    expect(res.body.outGoingRequests[2].user.id).toEqual(user3.id);
    expect(res.body.outGoingRequests[2].status).toEqual(TeamStatus.Pending);
  });
});
