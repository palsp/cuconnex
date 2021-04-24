import request from 'supertest';
import { app } from '../../../app';
import { Member } from '../../../models/member.model';
import { User } from '../../../models/user.model';
import { Business } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';

describe('USER--INFO: Get list of teams from user', () => {
  it('should return 404 if userId is not found', async () => {
    const user = await User.create({
      id: '6131778821',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);

    const searchId = '6131886621';
    const res = await request(app)
      .get(`/api/users/teams/${searchId}`)
      .set('Cookie', global.signin(user.id))
      .send()
      .expect(404);
  });

  it('should return empty teams[] if the user given is found but not accepted in any team yet', async () => {
    const user = await User.create({
      id: '6131778821',
      name: 'pal',
    });

    await Member.create({ userId: user.id, teamName: 'testTeam1', status: TeamStatus.Pending });

    const res = await request(app)
      .get(`/api/users/teams/${user.id}`)
      .set('Cookie', global.signin(user.id))
      .send()
      .expect(200);

    expect(res.body.teams.length).toEqual(0);
  });

  it('should return list of team if the user is found and is a member of one or more team(s)', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);
    const team1 = await user.createTeams({ name: 'testTeam1', description: '' });
    const team2 = await user.createTeams({ name: 'testTeam2', description: '' });
    const team3 = await user.createTeams({ name: 'testTeam3', description: '' });

    await team1.addAndAcceptMember(user);
    await team2.addAndAcceptMember(user);
    await team3.inviteMember(user);

    const res = await request(app)
      .get(`/api/users/teams/${user.id}`)
      .set('Cookie', global.signin(user.id))
      .send()
      .expect(200);

    expect(res.body.teams.length).toEqual(2);
    expect(res.body.teams[0]).toEqual(team1.name);
    expect(res.body.teams[1]).toEqual(team2.name);
  });
});
