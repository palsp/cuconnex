import request from 'supertest';
import { app } from '../../../app';
import { User, Event } from '../../../models';
import { Business } from '@cuconnex/common';
import { Interest } from '../../../models/interest.model';
import { deleteFile } from '../../../utils/file';

const setup = async () => {
  const event = await Event.create({ id: 1, eventName: 'testEvent', registration: true });

  const user = await User.create({ id: '6131707021', name: 'bird' });
  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });
  await user.addInterest(interest!);
  const team = await user.createTeams({
    name: 'testTeam',
    description: '',
    image: '',
    currentRecruitment: 'Developers',
  });

  return { user, team, event, interest };
};

describe('Edit Team', () => {
  it('should return 400 if user is not the creator of the team.', async () => {
    const { interest } = await setup();

    const user2 = await User.create({ id: '6131707022', name: 'bird2' });
    await user2.addInterest(interest!);

    const { body } = await request(app)
      .put('/api/teams')
      .set('Cookie', global.signin(user2.id))
      .field({
        name: 'testTeam',
        description: 'updated description',
        currentRecruitment: 'updated recruitment',
        lookingForMembers: true,
      })
      .attach('image', 'src/routes/__test__/test_images/testImage.jpg')
      .expect(400);

    expect(body.errors[0].message).toEqual('The requester is not the team creator.');
  });

  it('should return 200 if user can edit team successfully.', async () => {
    const { user } = await setup();

    await request(app)
      .put('/api/teams')
      .set('Cookie', global.signin(user.id))
      .field({
        name: 'testTeam',
        description: 'updated description',
        currentRecruitment: 'updated recruitment',
        lookingForMembers: true,
      })
      .attach('image', 'src/routes/__test__/test_images/testImage.jpg')
      .expect(200);

    const myTeam = await user.getMyTeams();
    expect(myTeam.length).toEqual(1);
    expect(myTeam[0].creatorId).toEqual(user.id);
    expect(myTeam[0].name).toEqual('testTeam');
    expect(myTeam[0].image).not.toEqual('');
    expect(myTeam[0].currentRecruitment).toEqual('updated recruitment');

    deleteFile(myTeam[0].image);
  });
});
