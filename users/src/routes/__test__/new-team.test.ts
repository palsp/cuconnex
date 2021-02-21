import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { InterestDescription } from '@cuconnex/common';

describe('Create a Team Test', () => {
  it('should return 401 if team name is already existed', async () => {
    const res = await request(app)
      .get('/api/teams')
      .send()
      .expect(401);

    console.log(res.body);
  });
});
