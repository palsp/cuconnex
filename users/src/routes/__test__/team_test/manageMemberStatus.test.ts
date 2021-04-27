import request from 'supertest';
import { app } from '../../../app';

import { Business } from '@cuconnex/common';
import { User, Interest } from '../../../models';

describe('Status Changing Test', () => {
  it('should return 404 if user is not found', async () => {
    const user1 = await User.create({
      id: '6131778821',
      name: 'pal',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });

    const res = await request(app)
      .post('/api/teams/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: '2',
        teamName: 'Team1',
        status: 'Accept',
      })
      .expect(404);

    expect(res.body.errors[0].message).toEqual('UserNot Found');
  });

  it('should return 404 if team is not found', async () => {
    const user1 = await User.create({
      id: '6131778821',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });

    await user1.addInterest(interest!);

    const res = await request(app)
      .post('/api/teams/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: '2',
        teamName: 'Team1',
        status: 'Accept',
      })
      .expect(404);

    expect(res.body.errors[0].message).toEqual('TeamNot Found');
  });

  it('should return 400 if the requester is not the team creator', async () => {
    const user1 = await User.create({
      id: '6131778821',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });

    const user2 = await User.create({
      id: '6131778822',
      name: 'pal2',
    });
    await user2.addInterest(interest!);

    const user3 = await User.create({
      id: '6131778823',
      name: 'pal3',
    });
    await user3.addInterest(interest!);
    await team.invite(user3);

    const res = await request(app)
      .post('/api/teams/members/status')
      .set('Cookie', global.signin(user2.id))
      .send({
        targetUserId: user3.id,
        teamName: 'Team1',
        status: 'Accept',
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual('You are not the team creator!');
  });

  it('should return 400 if the targetId is not yet pending request.', async () => {
    const user1 = await User.create({
      id: '6131778821',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });

    const user3 = await User.create({
      id: '6131778823',
      name: 'pal3',
    });
    await user3.addInterest(interest!);

    const res = await request(app)
      .post('/api/teams/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: user3.id,
        teamName: 'Team1',
        status: 'Accept',
      })
      .expect(400);

    expect(res.body.errors[0].message).toEqual(
      `Status for ${user3.id} and ${team.name} not found!`
    );
  });

  it('should return 200 if the creator can change status successfully.', async () => {
    const user1 = await User.create({
      id: '6131778821',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });

    const user3 = await User.create({
      id: '6131778823',
      name: 'pal3',
    });
    await user3.addInterest(interest!);
    await team.invite(user3);

    const res = await request(app)
      .post('/api/teams/members/status')
      .set('Cookie', global.signin(user1.id))
      .send({
        targetUserId: user3.id,
        teamName: 'Team1',
        status: 'Accept',
      })
      .expect(200);

    expect(res.body.message).toEqual(`Change status of ${user3.id} to Accept`);
  });
});
