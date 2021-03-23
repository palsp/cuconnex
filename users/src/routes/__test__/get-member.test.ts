import request from 'supertest';
import { app } from '../../app';
import { Member } from '../../models/member.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';
import { Interest } from '../../models/interest.model';

describe('Get Members', () => {
  it('should return "Team not found! if team is not found', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    const res = await request(app)
      .get('/api/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 200: member status detail if get member correctly', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });

    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user2 = await User.create({
      id: '6131886622',
      email: 'test2@test.com',
      password: 'password123',
      name: 'pal2'
    });
    await user2.addInterest(interest!);

    await Member.create({ userId: user2.id, teamName: 'Team1', status: TeamStatus.Pending });

    const res = await request(app)
      .get('/api/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1'
      })
      .expect(200);

    expect(res.body.message).toEqual(`Getting members of ${team.name}`);
    expect(res.body.members[0]).toEqual({
      teamName: team.name,
      userId: user1.id,
      status: 'Accept'
    });
    expect(res.body.members[1]).toEqual({
      teamName: team.name,
      userId: user2.id,
      status: 'Pending'
    });
  });
});
