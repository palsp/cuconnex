import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';

describe('Create a Team Test', () => {
  beforeAll(async () => {
    const user = await User.create({ id: '1', name: 'testName' });

    await user.createInterest({ description: InterestDescription.Business });
    // console.log(user);
    const team = await user.createTeams({ name: 'testTeam' });
    // console.log(team);
  });

  it('should return 401 if team name is already existed', async () => {
    const id = '1';
    const res = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(id))
      .send({
        name: 'testTeam'
      })
      .expect(401);

    console.log(res.body);
    const error = res.body.errors[0];
    expect(error.message).toEqual('Team name already existed.');
  });

  it('should return 401 if user is not authorized or user is not logged in.', async () => {
    // not logged in yet
    await request(app)
      .post('/api/teams')
      .send({ name: 'dummyTeam' })
      .expect(401);
  });

  it('should return User not found! if cannot find user in the database', async () => {
    const id = '2';
    const res = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(id))
      .send({
        name: 'testTeam'
      });
    // .expect(xxx)

    const error = res.body.errors[0];
    expect(error.message).toEqual('User not found!');
  });

  // afterAll(async ()=>{

  // })
});
