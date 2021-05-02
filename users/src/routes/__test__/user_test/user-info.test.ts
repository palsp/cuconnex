import request from 'supertest';
import { app } from '../../../app';
import { User, IsMember } from '../../../models';
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

    const user2 = await User.create({
      id: '6131778822',
      name: 'pal2',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'testTeam1', description: '' });
    await team.invite(user2);

    const res = await request(app)
      .get(`/api/users/teams/${user2.id}`)
      .set('Cookie', global.signin(user.id))
      .send()
      .expect(200);

    expect(res.body.teams.length).toEqual(0);
  });

  it('should return list of team if the user is found and is a member of one or more team(s)', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });
    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    await user2.addInterest(interest!);

    const team1 = await user1.createTeams({ name: 'testTeam1', description: '' });

    const team2 = await user1.createTeams({ name: 'testTeam2', description: '' });
    await team2.add(user2);

    const team3 = await user2.createTeams({ name: 'testTeam3', description: '' });
    await team3.invite(user1);

    const { body } = await request(app)
      .get(`/api/users/teams/${user1.id}`)
      .set('Cookie', global.signin(user1.id))
      .send()
      .expect(200);

    expect(body.teams.length).toEqual(2);

    expect(body.teams[0].name).toEqual(team1.name);
    expect(body.teams[0].members.length).toEqual(1);
    expect(body.teams[0].members[0].id).toEqual(user1.id);

    expect(body.teams[1].name).toEqual(team2.name);
    expect(body.teams[1].members.length).toEqual(2);
    expect(body.teams[1].members[0].id).toEqual(user2.id);
    expect(body.teams[1].members[1].id).toEqual(user1.id);
  });
});
