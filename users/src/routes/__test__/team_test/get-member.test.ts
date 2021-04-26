import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models/user.model';
import { Business } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';

describe('Get Members', () => {
  it('should return 404 "Team not found! if team is not found', async () => {
    const user = await User.create({
      id: '6131776621',
      name: 'test-user',
    });
    const res = await request(app)
      .get('/api/teams/members/notExistTeam')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(404);

    const error = res.body.errors[0];
    expect(error.message).toEqual('TeamNot Found');
  });

  it('should return 200: member status detail if get member correctly', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });
    const user2 = await User.create({
      id: '6131707021',
      name: 'bird',
    });
    const user3 = await User.create({
      id: '6131223221',
      name: 'superman',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });

    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'testTeam', description: '' });
    await team.addAndAcceptMember(user1);
    await team.inviteMember(user2);
    await team.inviteMember(user3);

    const res = await request(app)
      .get(`/api/teams/members/${team.name}`)
      .set('Cookie', global.signin(user1.id))
      .send({})
      .expect(200);

    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(user1.id);
    expect(res.body[0].name).toEqual(user1.name);
  });
});
