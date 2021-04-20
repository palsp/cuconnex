import request from 'supertest';
import { app } from '../../../app';
import { Member } from '../../../models/member.model';
import { User } from '../../../models/user.model';
import { Business } from '@cuconnex/common';
import { TeamStatus } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';



describe('Add member to Team --- Requesting', () => {
  it('should return 401 if user is not logged in yet', async () => {
    const res = await request(app)
      .post('/api/teams/request-to-join')
      .send({
        teamName: 'Team1'
      })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 400 if user is not yet fill in the information detail.', async () => {
    // const user1 = await User.create({
    //   id: '6131886621',
    //   name: 'pal'
    // });

    const user2 = await User.create({
      id: '6131776621',
      name: 'bob'
    });

    const res = await request(app)
      .post('/api/teams/request-to-join')
      .set('Cookie', global.signin())
      .send({
        teamName: 'Team1'
      })
      .expect(400);


    const error = res.body.errors[0];
    expect(error.message).toEqual('Please fill the information form first.');
  });

  it('should return 401 if team is not found.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal'
    });
    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase }
    });
    await user.addInterest(interest!);
    await user.createTeams({ name: 'Team1', description: '' });

    const res = await request(app)
      .post('/api/teams/request-to-join')
      .set('Cookie', global.signin(user.id))
      .send({
        teamName: 'Team2'
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 400 if member status is already there.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal'
    });

    // await user1.createInterest({ description: InterestDescription.Business });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase }
    });
    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'Team1', description: '' });
    const member = await Member.create({
      teamName: 'Team1',
      userId: user.id,
      status: TeamStatus.Accept
    });

    const res = await request(app)
      .post('/api/teams/request-to-join')
      .set('Cookie', global.signin(user.id))
      .send({
        teamName: team.name
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual(`This user already have status: ${member.status}`);
  });

  it('should return 200 if user request pending to a team successfully.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal'
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase }
    });
    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'Team1', description: '' });

    const res = await request(app)
      .post('/api/teams/request-to-join')
      .set('Cookie', global.signin(user.id))
      .send({
        teamName: 'Team1'
      })
      .expect(201);

    expect(res.body.message).toEqual('Request pending');
    expect(res.body.member).toEqual({ userId: user.id, teamName: team.name, status: 'Pending' });
  });
});




describe('Add member to Team --- Invitation', () => {
  it('should return 401 if user is not logged in yet', async () => {
    const res = await request(app)
      .post('/api/teams/members')
      .send({
        teamName: 'Team1',
        newMemberId: '9999'
      })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 400 if user is not yet fill in information detail.', async () => {

    const res = await request(app)
      .post('/api/teams/members')
      .set('Cookie', global.signin())
      .send({
        teamName: 'Team1',
        newMemberId: 1
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Please fill the information form first.');
  });

  it('should return 401 if team is not found.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal'
    });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2'
    });

    const res = await request(app)
      .post('/api/teams/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team2',
        newMemberId: user2.id
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Team not found!');
  });

  it('should return 400 if member status is already there.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal'
    });

    await user1.createTeams({ name: 'Team1', description: 'This is great' });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2'
    });


    await Member.create({
      teamName: 'Team1',
      userId: user1.id,
      status: TeamStatus.Accept
    });

    const member2 = await Member.create({
      teamName: 'Team1',
      userId: user2.id,
      status: TeamStatus.Accept
    });

    const res = await request(app)
      .post('/api/teams/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1',
        newMemberId: user2.id
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual(`This user already have status: ${member2.status}`);
  });



  it('should return 400 if the inviter is not a member of the team.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal'
    });

    await user1.createTeams({ name: 'Team1', description: '' });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2'
    });

    const res = await request(app)
      .post('/api/teams/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1',
        newMemberId: user2.id
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('The inviter is not a team member.');
  });

  /**
   * ดู logic ตรงนี้ใหม่
   */
  it('should return 400 if the inviter is not a yet a member of the team but having pending status.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal'
    });


    await user1.createTeams({ name: 'Team1', description: '' });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2'
    });


    await Member.create({
      teamName: 'Team1',
      userId: user1.id,
      status: TeamStatus.Pending
    });

    const res = await request(app)
      .post('/api/teams/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1',
        newMemberId: user2.id
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('The inviter is not yet a team member.');
  });

  it('should return 201 if invite successfully.', async () => {
    const user1 = await User.create({
      id: '6131886621',
      name: 'pal'
    });

    const team = await user1.createTeams({ name: 'Team1', description: '' });

    const user2 = await User.create({
      id: '6131886622',
      name: 'pal2'
    });


    await Member.create({
      teamName: 'Team1',
      userId: user1.id,
      status: TeamStatus.Accept
    });

    const res = await request(app)
      .post('/api/teams/members')
      .set('Cookie', global.signin(user1.id))
      .send({
        teamName: 'Team1',
        newMemberId: user2.id
      })
      .expect(201);

    expect(res.body.message).toEqual('Invite pending');
    expect(res.body.userId).toEqual(user2.id);
    expect(res.body.team).toEqual(team.name);
  });
});
