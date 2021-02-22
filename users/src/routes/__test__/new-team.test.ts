import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';

describe('Create a Team Test', () => {
  beforeAll(async () => {
    const user = await User.create({ id: '1', name: 'testName' });
    await user.createInterest({ description: InterestDescription.Business });

    await user.createTeams({ teamId: '1', teamName: 'testTeam' });
  });

  it('should return 401 if team name is already existed', async () => {
    const id = '6131707021';
    const res = await request(app)
      .get('/api/teams')
      .set('Cookie', global.signin(id))
      .send({
        teamId: '0001',
        userId: '6131707021',
        teamName: 'd2'
      })
      .expect(401);

    console.log(res.body);
  });

  it('should return 401 if user is not authorized or user is not logged in.', async () => {});

  it.todo('sadkasl;dkas');
});
