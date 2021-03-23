import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';
import { Interest } from '../../models/interest.model';

describe('Get Team Test', () => {
  it('should return "Team not found!" if team is not found', async () => {
    const id = '1';
    const res = await request(app)
      .get('/api/teams')
      .set('Cookie', global.signin(id))
      .send({ name: 'notExsitingTeam' })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return team detail if it is found', async () => {
    const user = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });

    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'testTeam', description: '' });

    const res = await request(app)
      .get('/api/teams')
      .set('Cookie', global.signin(user.id))
      .send({ name: team.name })
      .expect(200);

    expect(res.body.team.name).toEqual(team.name);
    expect(res.body.team.creatorId).toEqual(user.id);
  });
});
