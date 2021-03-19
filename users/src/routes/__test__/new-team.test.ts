import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';
import { User } from '../../models/user.model';
import { InterestDescription, TeamStatus } from '@cuconnex/common';
import { Interest } from '../../models/interest.model';

describe('Create a Team Test', () => {
  it('should return 400 if team name is already existed', async () => {
    const user = await User.create({ id: '1', username: 'testName' });
    // await user.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user.addInterest(interest!)
    const team = await user.createTeams({ name: 'testTeam' });

    const res = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(user.id))
      .send({
        name: 'testTeam'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team name already existed.');
  });

  it('should return 401 if user is not authorized or user is not logged in.', async () => {
    const user = await User.create({ id: '1', username: 'testName' });
    // await user.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user.addInterest(interest!)
    const team = await user.createTeams({ name: 'testTeam' });

    // no global log in
    const res = await request(app)
      .post('/api/teams')
      .send({ name: 'testTeam' })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return "User not found!" if cannot find user in the database', async () => {
    const user = await User.create({ id: '1', username: 'testName' });
    // await user.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user.addInterest(interest!)
    const team = await user.createTeams({ name: 'testTeam' });

    const id = '2';
    const res = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(id))
      .send({
        name: 'testTeam'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('User not found!');
  });

  it('should create team successfully if user is authorized and team name is unique.', async () => {
    const user = await User.create({ id: '1', username: 'testName' });
    // await user.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user.addInterest(interest!)
    const team = await user.createTeams({ name: 'testTeam' });

    const res = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(user.id))
      .send({
        name: 'newTeam'
      })
      .expect(201);

    const status = await Member.findAll({ where: { userId: user.id, teamName: 'newTeam' } });

    expect(status[0].userId).toEqual(user.id);
    expect(status[0].teamName).toEqual('newTeam');
    expect(status[0].status).toEqual(TeamStatus.Accept);

    expect(res.body.message).toEqual(`Create team successfully by ${user.id}.`);
    expect(res.body.userId).toEqual(user.id);
    expect(res.body.name).toEqual('newTeam');
    expect(res.body.name).toEqual('newTeam');
  });
});
