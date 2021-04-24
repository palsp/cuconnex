import request from 'supertest';
import { app } from '../../../app';
import { User, Member } from '../../../models';

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

// should check all IF-STATEMENT cases on /api/users/invitaion as well
// but lazy for now...
describe('User manages his/her connection(s) with teams', () => {
  it('should return 200 if a user can accept/reject his/her status correctly.', async () => {
    const { sender, receiver } = await setup();

    const team1 = await sender.createTeams({ name: 'testTeam', description: '' });
    await team1.addAndAcceptMember(sender);

    const team2 = await sender.createTeams({ name: 'testTeam2', description: '' });
    await team2.addAndAcceptMember(sender);

    await team1.inviteMember(receiver);
    await team2.inviteMember(receiver);

    await request(app)
      .post('/api/users/invitation')
      .set('Cookie', global.signin(receiver.id))
      .send({ teamName: team1.name, newStatusFromUser: TeamStatus.Accept })
      .expect(200);

    const member1AfterChanged = await Member.findOne({
      where: { userId: receiver.id, teamName: team1.name },
    });
    expect(member1AfterChanged!.status).toEqual(TeamStatus.Accept);

    await request(app)
      .post('/api/users/invitation')
      .set('Cookie', global.signin(receiver.id))
      .send({ teamName: team2.name, newStatusFromUser: TeamStatus.Reject })
      .expect(200);

    const member2AfterChanged = await Member.findOne({
      where: { userId: receiver.id, teamName: team2.name },
    });
    expect(member2AfterChanged!.status).toEqual(TeamStatus.Reject);
  });
});
