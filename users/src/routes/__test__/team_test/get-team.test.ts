import request from 'supertest';
import { app } from '../../../app';

import { User } from '../../../models/user.model';
import { Business } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';

describe('Get Team Test', () => {
  it('should return 404 "Team not found!" if team is not found', async () => {
    const id = '1';
    const res = await request(app)
      .get('/api/teams/notExistingTeam')
      .set('Cookie', global.signin(id))
      .send({})
      .expect(404);

    const error = res.body.errors[0];
    expect(error.message).toEqual('TeamNot Found');
  });

  it('should return team detail if it is found', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });

    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'testTeam', description: '' });

    const res = await request(app)
      .get(`/api/teams/${team.name}`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.body.team.name).toEqual(team.name);
    expect(res.body.team.creatorId).toEqual(user.id);
  });
});
