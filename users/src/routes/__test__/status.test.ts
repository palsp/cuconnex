import request from 'supertest';
import { app } from '../../app';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';

describe('Status Changing Test', () => {
  it('should return 400 if user is not found', async () => {
    const user1 = await User.create({ id: '1', username: 'testName1' });
    await user1.createInterest({ description: InterestDescription.Business });
    const team = await user1.createTeams({ name: 'Team1' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin('1'))
      .send({
        targetUserId: '2',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('User not found!');
  });

  it('should return 400 if team is not found', async () => {
    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin('1'))
      .send({
        targetUserId: '2',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('Team not found!');
  });

  it('should return 400 if the requester is not the team creator', async () => {
    const user1 = await User.create({ id: '1', username: 'testName1' });
    await user1.createInterest({ description: InterestDescription.Business });
    const team = await user1.createTeams({ name: 'Team1' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user2 = await User.create({ id: '2', username: 'testName2' });
    await user2.createInterest({ description: InterestDescription.Business });
    await Member.create({ userId: user2.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user3 = await User.create({ id: '3', username: 'testName3' });
    await user3.createInterest({ description: InterestDescription.Business });
    await Member.create({ userId: user3.id, teamName: 'Team1', status: TeamStatus.Pending });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin('2'))
      .send({
        targetUserId: '3',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('You are not the team creator!');
  });

  it('should return 400 if the targetId is not yet pending request.', async () => {
    const user1 = await User.create({ id: '1', username: 'testName1' });
    await user1.createInterest({ description: InterestDescription.Business });
    const team = await user1.createTeams({ name: 'Team1' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user3 = await User.create({ id: '3', username: 'testName3' });
    await user3.createInterest({ description: InterestDescription.Business });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin('1'))
      .send({
        targetUserId: '3',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual(
      `Status for ${user3.id} and ${team.name} not found!`
    );
  });

  it('should return 200 if the creator can change status successfully.', async () => {
    const user1 = await User.create({ id: '1', username: 'testName1' });
    await user1.createInterest({ description: InterestDescription.Business });
    const team = await user1.createTeams({ name: 'Team1' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user3 = await User.create({ id: '3', username: 'testName3' });
    await user3.createInterest({ description: InterestDescription.Business });
    const oldStatus = await Member.create({
      userId: user3.id,
      teamName: 'Team1',
      status: TeamStatus.Pending
    });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin('1'))
      .send({
        targetUserId: '3',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(200);

    expect(res.body.message).toEqual(
      `Change status of ${user3.id} from ${oldStatus.status} to Accept`
    );
  });
});
