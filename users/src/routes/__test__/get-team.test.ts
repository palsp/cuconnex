import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { InterestDescription } from '@cuconnex/common';

describe('Get Team Test', () => {
  it('should return 404 if teamId is not found', () => {});

  it('should user information if user already add information', async () => {
    const id = '6131778821';
    const user = await User.create({ name: 'pal', id });
    await user.createInterests({ interest: InterestDescription.Business });

    const { body: res } = await request(app)
      .get('/api/users')
      .set('Cookie', global.signin(id))
      .send()
      .expect(200);

    console.log(res);
    expect(res.id).toEqual(user.id);
    expect(res.name).toEqual(user.name);
  });
});
