import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models/user.model';
import { Member } from '../../../models/member.model';
import { Team } from '../../../models/team.model';

import { validateRequest, TeamStatus, NotAuthorizedError, BadRequestError } from '@cuconnex/common';

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
    await Member.create({ userId: receiver.id, teamName: team1.name, status: TeamStatus.Pending });
    await Member.create({ userId: receiver.id, teamName: team2.name, status: TeamStatus.Pending });

    const res = await request(app)
      .get('/api/users/notification/invite')
      .set('Cookie', global.signin(receiver.id))
      .send()
      .expect(200);

    expect(res.body.teams[0]).toEqual('testTeam');
    expect(res.body.teams[1]).toEqual('testTeam2');
  });
});
