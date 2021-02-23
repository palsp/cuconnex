import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';

describe('Get Team Test', () => {
  beforeAll(async () => {
    const user = await User.create({ id: '1', name: 'testName' });
    await user.createInterest({ description: InterestDescription.Business });
    await user.createTeams({ name: 'testTeam' });
  });

  it('should return 404 if team is not found', async () => {
    const id = '1';
    const res = await request(app)
      .get('/api/teams')
      .set('Cookie', global.signin(id))
      .send({ name: 'xxx' })
      .expect(404);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return team detail if it is found', async () => {
    const id = '1';
    const res = await request(app)
      .get('/api/teams')
      .set('Cookie', global.signin(id))
      .send({ name: 'testTeam' })
      .expect(200);

    // todo
  });
});
