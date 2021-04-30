import { Business } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../../app';
import { User, Interest } from '../../../models';

const setup = async () => {
  const user0 = await User.create({
    id: '6131778821',
    name: 'pal',
  });

  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });

  await user0.addInterest(interest!);
  const team1 = await user0.createTeam({
    name: 'testTeam1',
    description: 'This is a testing team 1',
  });
  const team2 = await user0.createTeam({
    name: 'testTeam2',
    description: 'This is a testing team 2',
  });
  const team3 = await user0.createTeam({
    name: 'testTeam3',
    description: 'This is a testing team 3',
  });

  return { user0, team1, team2, team3, interest };
};

describe('The /api/users/get-my-requests', () => {
  it('should return 200 with empty array if user has no pending team', async () => {
    const { team1, team2, team3 } = await setup();
    const user2 = await User.create({
      id: '6131707021',
      name: 'bird',
    });

    await team1.invite(user2);
    await team2.invite(user2);
    await team3.invite(user2);

    const res = await request(app)
      .get('/api/users/get-my-requests')
      .set('Cookie', global.signin(user2.id))
      .send()
      .expect(200);

    expect(res.body.teams.length).toEqual(0);
  });

  it('should return 200 if get pending-request team successfully', async () => {
    const { team1, team2, team3 } = await setup();
    const user2 = await User.create({
      id: '6131707021',
      name: 'bird',
    });

    await user2.requestToJoin(team1);
    await user2.requestToJoin(team2);
    await team3.invite(user2);

    const res = await request(app)
      .get('/api/users/get-my-requests')
      .set('Cookie', global.signin(user2.id))
      .send()
      .expect(200);

    expect(res.body.teams.length).toEqual(2);
    expect(res.body.teams[0].name).toEqual(team1.name);
    expect(res.body.teams[1].name).toEqual(team2.name);

    await team1.add(user2);

    const res2 = await request(app)
      .get('/api/users/get-my-requests')
      .set('Cookie', global.signin(user2.id))
      .send()
      .expect(200);

    expect(res2.body.teams.length).toEqual(1);
    expect(res2.body.teams[0].name).toEqual(team2.name);
  });
});
