import { Business } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../../app';
import { User, Interest } from '../../../models';

const setup = async () => {
  const user1 = await User.create({
    id: '6131778821',
    name: 'pal',
  });

  const user2 = await User.create({
    id: '6131778822',
    name: 'pal2',
  });

  const user3 = await User.create({
    id: '6131778823',
    name: 'pal3',
  });

  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });

  await user1.addInterest(interest!);
  await user2.addInterest(interest!);
  await user3.addInterest(interest!);

  const team1 = await user1.createTeam({
    name: 'testTeam1',
    description: 'This is a testing team 1',
  });

  return { user1, user2, user3, team1 };
};

describe('get my status with the team provided', () => {
  it('should return 401 if user is not authenticated', async () => {
    const { body } = await request(app).get('/api/users/status/testTeam').send().expect(401);
    expect(body.errors[0].message).toEqual('Not Authorized');
  });

  it('should return 404 if team not found', async () => {
    const { user1 } = await setup();

    const { body } = await request(app)
      .get('/api/users/status/testTeam')
      .set('Cookie', global.signin(user1.id))
      .send()
      .expect(404);

    expect(body.errors[0].message).toEqual('TeamNot Found');
  });

  it('should return 200 with correct status of the following users', async () => {
    const { user1, user2, user3, team1 } = await setup();

    await user2.requestToJoin(team1);
    await team1.invite(user3);

    // sent by creator
    const res = await request(app)
      .get('/api/users/status/testTeam1')
      .set('Cookie', global.signin(user1.id))
      .send()
      .expect(200);
    expect(res.body.status).toEqual('Accept');
    expect(res.body.sender).toEqual('');

    // sent by user 2 : request to join by USER
    const res2 = await request(app)
      .get('/api/users/status/testTeam1')
      .set('Cookie', global.signin(user2.id))
      .send()
      .expect(200);
    expect(res2.body.status).toEqual('Pending');
    expect(res2.body.sender).toEqual('user');

    // sent by user 3 : invite by TEAM
    const res3 = await request(app)
      .get('/api/users/status/testTeam1')
      .set('Cookie', global.signin(user3.id))
      .send()
      .expect(200);
    expect(res3.body.status).toEqual('Pending');
    expect(res3.body.sender).toEqual('team');
  });
});
