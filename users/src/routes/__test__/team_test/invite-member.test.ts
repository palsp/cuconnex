import request from 'supertest';
import { app } from '../../../app';
import { User, Interest } from '../../../models';
import { TeamStatus, Business } from '@cuconnex/common';

describe('A Team Invite Member', () => {
  it('should return 401 if user is not logged in yet', async () => {
    const res = await request(app)
      .post('/api/teams/invite-member')
      .send({
        teamName: 'Team1',
        newMemberId: '9999',
      })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 400 if user is not yet fill in information detail.', async () => {
    const res = await request(app)
      .post('/api/teams/invite-member')
      .set('Cookie', global.signin())
      .send({
        teamName: 'Team1',
        newMemberId: 1,
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Please fill the information form first.');
  });

  it('should return 404 if team is not found.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2',
    });

    const res = await request(app)
      .post('/api/teams/invite-member')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team2',
        newMemberId: user2.id,
      })
      .expect(404);

    const error = res.body.errors[0];
    expect(error.message).toEqual('TeamNot Found');
  });

  it('should return 400 if member status is already there.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const team = await user1.createTeams({ name: 'Team1', description: 'This is great' });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2',
    });

    await team.invite(user2);

    const res = await request(app)
      .post('/api/teams/invite-member')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1',
        newMemberId: user2.id,
      })
      .expect(400);
  });

  it('should return 400 if the inviter is not a member of the team or in pending status.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2',
    });

    const user3 = await User.create({
      id: '6131886623',
      name: 'pal3',
    });

    const user4 = await User.create({
      id: '6131886624',
      name: 'pal4',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user1.addInterest(interest!);
    await user2.addInterest(interest!);
    await user3.addInterest(interest!);
    await user4.addInterest(interest!);
    const team = await user1.createTeams({ name: 'Team1', description: '' });
    team.invite(user2);

    const res1 = await request(app)
      .post('/api/teams/invite-member')
      .set('Cookie', global.signin(user2.id))
      .send({
        teamName: 'Team1',
        newMemberId: user4.id,
      })
      .expect(400);

    const res2 = await request(app)
      .post('/api/teams/invite-member')
      .set('Cookie', global.signin(user3.id))
      .send({
        teamName: 'Team1',
        newMemberId: user4.id,
      })
      .expect(400);

    const error1 = res1.body.errors[0];
    const error2 = res2.body.errors[0];
    expect(error1.message).toEqual('The inviter is not a team member.');
    expect(error2.message).toEqual('The inviter is not a team member.');
  });

  it('should return 201 if invite successfully.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal',
    });
    const team = await user1.createTeams({ name: 'Team1', description: '' });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2',
    });

    const res = await request(app)
      .post('/api/teams/invite-member')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1',
        newMemberId: user2.id,
      })
      .expect(201);

    expect(res.body.message).toEqual('Invite pending');
    expect(res.body.userId).toEqual(user2.id);
    expect(res.body.team).toEqual(team.name);
  });
});
