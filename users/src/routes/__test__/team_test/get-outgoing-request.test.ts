import request from 'supertest';
import { app } from '../../../app';
import { User, Interest } from '../../../models';
import { Business, TeamStatus } from '@cuconnex/common';

describe('Get Outgoing Requests', () => {
  it('should return 404 "Team not found! if team is not found', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });

    const res = await request(app)
      .get('/api/teams/outgoing-requests/notExistTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(404);

    const error = res.body.errors[0];
    expect(error.message).toEqual('TeamNot Found');
  });

  it('should return 401 not Authorized if the request user is not part of the team', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });

    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'testTeam', description: '' });

    const user2 = await User.create({
      id: '6131773621',
      name: 'test-user2',
    });
    await user2.addInterest(interest!);

    const res = await request(app)
      .get('/api/teams/outgoing-requests/testTeam')
      .set('Cookie', global.signin(user2.id))
      .send({})
      .expect(400);
    expect(res.body.errors[0].message).toEqual('The request user is not part of the team');
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

    await team.invite(user2);
    await team.invite(user3);

    const res = await request(app)
      .get('/api/teams/outgoing-requests/testTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.body.outgoingRequests.teamName).toEqual(team.name);
    expect(res.body.outgoingRequests.pendingUsers[0].id).toEqual(user2.id);
    expect(res.body.outgoingRequests.pendingUsers[1].id).toEqual(user3.id);

    await team.add(user2);
    await team.add(user3);

    const res2 = await request(app)
      .get('/api/teams/outgoing-requests/testTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res2.body.outgoingRequests.pendingUsers.length).toEqual(0);
  });
});
