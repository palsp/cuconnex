import request from 'supertest';
import { app } from '../../app';

import { User } from '../../models/user.model';
import { Business } from '@cuconnex/common';
import { Interest } from '../../models/interest.model';

describe('Get Team Test', () => {
  it('should return "Team not found!" if team is not found', async () => {
    const id = '1';
    const res = await request(app)
      .get('/api/teams/notExistingTeam')
      .set('Cookie', global.signin(id))
      // .send({ name: 'notExsitingTeam' })
      .send({})
      .expect(400);


    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return team detail if it is found', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal'
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase }
    });

    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'testTeam', description: '' });

    const { body } = await request(app)
      .get(`/api/teams/${team.name}`)
      .set('Cookie', global.signin(user.id))
      // .send({ name: team.name })
      .send({})
      .expect(200);

    console.log(body)

    expect(body.team.name).toEqual(team.name);
    expect(body.team.creatorId).toEqual(user.id);
  });
});
