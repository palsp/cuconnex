import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';

describe('Get Team Test', () => {
  it('should return 404 if teamId is not found', async () => {
    const id = '6131707021';
    const result = await request(app)
      .get('/api/users')
      .set('Cookie', global.signin(id))
      .send({ teamId: 'xxx' })
      .expect(404);

    console.log(result);
  });
});
