import request from 'supertest';
import { app } from '../../../app';
import { Team, IsMember, User } from '../../../models';

import { TeamStatus } from '@cuconnex/common';

const setup = async () => {
  const sender = await User.create({
    id: '6131886621',
    name: 'pal',
  });

  const receiver = await User.create({
    id: '6131776621',
    name: 'receiver',
  });

  return { sender, receiver };
};

describe('notification for a user', () => {
  it('should return 204 (no content) if there is no invitaion from any team', async () => {
    const { receiver } = await setup();
    await request(app)
      .get('/api/users/notification/invite')
      .set('Cookie', global.signin(receiver.id))
      .send()
      .expect(204);
  });

  it('should get all invitaions from user if there is', async () => {
    const { sender, receiver } = await setup();

    const team1 = await sender.createTeams({ name: 'testTeam', description: '' });
    const team2 = await sender.createTeams({ name: 'testTeam2', description: '' });
    const team3 = await sender.createTeams({ name: 'testTeam3', description: '' });

    await team1.invite(receiver);
    await team2.invite(receiver);
    await receiver.requestToJoin(team3);

    const res = await request(app)
      .get('/api/users/notification/invite')
      .set('Cookie', global.signin(receiver.id))
      .send()
      .expect(200);

    expect(res.body.teams[0]).toEqual('testTeam');
    expect(res.body.teams[1]).toEqual('testTeam2');
  });
});
