import request from 'supertest';
import { app } from '../../../app';
import { Interest, User, IsMember } from '../../../models';
import { TeamStatus, Business } from '@cuconnex/common';

describe('A user request to join team', () => {
  it('should return 401 if user is not logged in yet', async () => {
    const res = await request(app)
      .post('/api/users/request-to-join')
      .send({
        teamName: 'Team1',
      })
      .expect(401);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 400 if user is not yet fill in the information detail.', async () => {
    const user2 = await User.create({
      id: '6131776621',
      name: 'bob',
    });

    const res = await request(app)
      .post('/api/users/request-to-join')
      .set('Cookie', global.signin())
      .send({
        teamName: 'Team1',
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Please fill the information form first.');
  });

  it('should return 404 if team is not found.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);
    await user.createTeams({ name: 'Team1', description: '' });

    const res = await request(app)
      .post('/api/users/request-to-join')
      .set('Cookie', global.signin(user.id))
      .send({
        teamName: 'Team2',
      })
      .expect(404);

    const error = res.body.errors[0];
    expect(error.message).toEqual('TeamNot Found');
  });

  it('should return 400 if member status is already there.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'Team1', description: '' });
    await user.requestToJoin(team);

    const res = await request(app)
      .post('/api/users/request-to-join')
      .set('Cookie', global.signin(user.id))
      .send({
        teamName: team.name,
      })
      .expect(400);
  });

  it('should return 200 if user request pending to a team successfully.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal',
    });

    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);
    const team = await user.createTeams({ name: 'Team1', description: '' });

    const res = await request(app)
      .post('/api/users/request-to-join')
      .set('Cookie', global.signin(user.id))
      .send({
        teamName: 'Team1',
      })
      .expect(201);

    expect(res.body.message).toEqual('Request pending');
  });
});
