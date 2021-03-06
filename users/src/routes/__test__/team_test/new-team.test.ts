import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models';
import { Business } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';
import { deleteFile } from '../../../utils/file';

const setupTeam = async () => {
  const user = await User.create({
    id: '6131886621',
    name: 'pal',
  });
  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });
  await user.addInterest(interest!);
  const team = await user.createTeams({ name: 'testTeam', description: 'this is a great team' });

  return { user, interest, team };
};

describe('Create a Team Test', () => {
  it('should return 400 if team name is already existed', async () => {
    const { user, team } = await setupTeam();

    const { body } = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(user.id))
      .send({
        name: team.name,
        description: team.description,
      })
      .expect(400);

    const error = body.errors[0];
    expect(error.message).toEqual('Team name already existed.');
  });

  it('should return 401 if user is not authorized or user is not logged in.', async () => {
    const { user, team } = await setupTeam();

    // no global log in
    const { body } = await request(app)
      .post('/api/teams')
      .send({ name: team.name, description: team.description })
      .expect(401);

    const error = body.errors[0];
    expect(error.message).toEqual('Not Authorized');
  });

  it('should return 400 if no the requested user does not fill in the information yet. ', async () => {
    const id = '2';
    const res = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(id))
      .send({
        name: 'testTeam',
        description: 'test description',
      })
      .expect(400);

    const error = res.body.errors[0];
    expect(error.message).toEqual('Please fill the information form first.');
  });

  it('should create team successfully if user is authorized and team name is unique.', async () => {
    const user = await User.create({
      id: '6131886621',
      name: 'pal',
    });
    const interest = await Interest.findOne({
      where: { description: Business.BusinessCase },
    });
    await user.addInterest(interest!);

    const { body } = await request(app)
      .post('/api/teams')
      .set('Cookie', global.signin(user.id))
      .field({ name: 'newTeam', description: 'my new team', currentRecruitment: 'Developers' })
      .attach('image', 'src/routes/__test__/test_images/testImage.jpg')
      .expect(201);

    const myTeam = await user.getMyTeams();
    expect(myTeam.length).toEqual(1);
    expect(myTeam[0].creatorId).toEqual(user.id);
    expect(myTeam[0].name).toEqual('newTeam');
    expect(myTeam[0].image).not.toEqual('');
    expect(myTeam[0].currentRecruitment).toEqual('Developers');

    expect(body.team.creatorId).toEqual(user.id);
    expect(body.team.name).toEqual('newTeam');

    deleteFile(body.team.image);
  });
});
