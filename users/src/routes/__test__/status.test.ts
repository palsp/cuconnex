import request from 'supertest';
import { app } from '../../app';
import { Member } from '../../models/member.model';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';
import { Interest } from '../../models/interest.model';

describe('Status Changing Test', () => {
  it('should return 400 if user is not found', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });
    await user1.addInterest(interest!);
    await user1.createTeams({ name: 'Team1', description: '' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: '2',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('User not found!');
  });

  it('should return 400 if team is not found', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });

    await user1.addInterest(interest!);

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: '2',
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('Team not found!');
  });

  it('should return 400 if the requester is not the team creator', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });

    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user2 = await User.create({
      id: '6131886622',
      email: 'test2@test.com',
      password: 'password123',
      name: 'pal2'
    });
    await user2.addInterest(interest!);
    await Member.create({ userId: user2.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user3 = await User.create({
      id: '6131886623',
      email: 'test3@test.com',
      password: 'password123',
      name: 'pal3'
    });
    await user3.addInterest(interest!);
    await Member.create({ userId: user3.id, teamName: 'Team1', status: TeamStatus.Pending });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin(user2.id))
      .send({
        targetUserId: user3.id,
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('You are not the team creator!');
  });

  it('should return 400 if the targetId is not yet pending request.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user3 = await User.create({
      id: '6131886623',
      email: 'test3@test.com',
      password: 'password123',
      name: 'pal3'
    });
    await user3.addInterest(interest!);

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: user3.id,
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual(
      `Status for ${user3.id} and ${team.name} not found!`
    );
  });

  it('should return 200 if the creator can change status successfully.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      email: 'test1@test.com',
      password: 'password123',
      name: 'pal'
    });
    const interest = await Interest.findOne({
      where: { description: InterestDescription.Business }
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });
    await Member.create({ userId: user1.id, teamName: 'Team1', status: TeamStatus.Accept });

    const user3 = await User.create({
      id: '6131886623',
      email: 'test3@test.com',
      password: 'password123',
      name: 'pal3'
    });
    await user3.addInterest(interest!);
    const oldStatus = await Member.create({
      userId: user3.id,
      teamName: 'Team1',
      status: TeamStatus.Pending
    });

    const res = await request(app)
      .post('/api/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: user3.id,
        teamName: 'Team1',
        status: 'Accept'
      })
      .expect(200);

    expect(res.body.message).toEqual(
      `Change status of ${user3.id} from ${oldStatus.status} to Accept`
    );
  });
});
