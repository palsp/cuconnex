import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';
import { Interest } from '../../models/interest.model'

describe('Add member to Team --- Requesting', () => {
  it('should return 401 if user is not logged in yet', async () => {
    const res = await request(app)
      .post('/api/members/request')
      .send({
        teamName: 'Team1'
      })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 401 if userId is not found.', async () => {
    const res = await request(app)
      .post('/api/members/request')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('User not found!');
  });

  it('should return 401 if team is not found.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    await user1.createTeams({ name: 'Team1' });

    const res = await request(app)
      .post('/api/members/request')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team2'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 400 if member status is already there.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    const team = await user1.createTeams({ name: 'Team1' });
    const member = await Member.create({
      teamName: 'Team1',
      userId: '1',
      status: TeamStatus.Accept
    });

    const res = await request(app)
      .post('/api/members/request')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: team.name
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual(`This user already have status: ${member.status}`);
  });

  it('should return 200 if user request pending to a team successfully.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    const team = await user1.createTeams({ name: 'Team1' });

    const res = await request(app)
      .post('/api/members/request')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1'
      })
      .expect(201);

    expect(res.body.message).toEqual('Request pending');
    expect(res.body.member).toEqual({ userId: user1.id, teamName: team.name, status: 'Pending' });
  });
});

describe('Add member to Team --- Invitation', () => {
  it('should return 401 if user is not logged in yet', async () => {
    const res = await request(app)
      .post('/api/members/invite')
      .send({
        teamName: 'Team1',
        newMemberId: '9999'
      })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 401 if userId is not found.', async () => {
    const res = await request(app)
      .post('/api/members/invite')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1',
        newMemberId: '9999'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('User not found!');
  });

  it('should return 401 if team is not found.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    await user1.createTeams({ name: 'Team1' });

    const user2 = await User.create({ id: '2', username: 'user2' });
    // await user2.createInterest({ description: InterestDescription.Business });
    await user2.addInterest(interest!)

    const res = await request(app)
      .post('/api/members/invite')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team2',
        newMemberId: '2'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 400 if member status is already there.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    await user1.createTeams({ name: 'Team1' });

    const user2 = await User.create({ id: '2', username: 'user2' });
    // await user2.createInterest({ description: InterestDescription.Business });
    await user2.addInterest(interest!)

    const member1 = await Member.create({
      teamName: 'Team1',
      userId: '1',
      status: TeamStatus.Accept
    });

    const member2 = await Member.create({
      teamName: 'Team1',
      userId: '2',
      status: TeamStatus.Accept
    });

    const res = await request(app)
      .post('/api/members/invite')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1',
        newMemberId: '2'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual(`This user already have status: ${member2.status}`);
  });

  it('should return 400 if the inviter is not a member of the team.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    await user1.createTeams({ name: 'Team1' });

    const user2 = await User.create({ id: '2', username: 'user2' });
    // await user2.createInterest({ description: InterestDescription.Business });
    await user2.addInterest(interest!)
    const res = await request(app)
      .post('/api/members/invite')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1',
        newMemberId: '2'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('The inviter is not a team member.');
  });

  it('should return 400 if the inviter is not a yet a member of the team but having pending status.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    await user1.createTeams({ name: 'Team1' });

    const user2 = await User.create({ id: '2', username: 'user2' });
    // await user2.createInterest({ description: InterestDescription.Business });
    await user2.addInterest(interest!)

    const member1 = await Member.create({
      teamName: 'Team1',
      userId: '1',
      status: TeamStatus.Pending
    });

    const res = await request(app)
      .post('/api/members/invite')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1',
        newMemberId: '2'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('The inviter is not yet a team member.');
  });

  it('should return 201 if invite successfully.', async () => {
    const user1 = await User.create({ id: '1', username: 'user1' });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({ where: { description: InterestDescription.Business } })
    await user1.addInterest(interest!)
    const team = await user1.createTeams({ name: 'Team1' });

    const user2 = await User.create({ id: '2', username: 'user2' });
    // await user2.createInterest({ description: InterestDescription.Business });
    await user2.addInterest(interest!)

    const member1 = await Member.create({
      teamName: 'Team1',
      userId: '1',
      status: TeamStatus.Accept
    });

    const res = await request(app)
      .post('/api/members/invite')
      .set('Cookie', global.signin('1'))
      .send({
        teamName: 'Team1',
        newMemberId: '2'
      })
      .expect(201);

    expect(res.body.message).toEqual('Invite pending');
    expect(res.body.user).toEqual(user2.username);
    expect(res.body.team).toEqual(team.name);
  });
});
