import request from 'supertest';
import { app } from '../../../app';
import { Member } from '../../../models/member.model';
import { User } from '../../../models/user.model';
import { Business } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';

describe('Get Members', () => {
  it('should return "Team not found! if team is not found', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });
    const res = await request(app)
      .get('/api/teams/members/notExistTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 200: member status detail if get member correctly', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });
    await team.addAndAcceptMember(user1);

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2',
    });
    await user2.addInterest(interest!);
    await team.addAndAcceptMember(user2);

    const res = await request(app)
      .get(`/api/teams/members/${team.name}`)
      .set('Cookie', global.signin(user1.id))
      .send({})
      .expect(200);
  });
});
