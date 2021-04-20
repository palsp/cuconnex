import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';
import { FriendStatus, Business } from '@cuconnex/common';
import { Interest } from '../../models/interest.model';

/**
 *  its return user instance and interest instance
 */
const setup = async () => {
  const user = await User.create({
    id: '6131778821',
    name: 'pal',
    image: '/file/path'
  });

  const interest = await Interest.findOne({
    where: { description: Business.BusinessCase },
  });

  await user.addInterest(interest!);

  return { user, interest };
};

describe('get current user', () => {
  it('should return 401 if user is not authenticated', async () => {
    const { body } = await request(app).get('/api/users').send().expect(401);

    expect(body.errors[0].message).toEqual('Not Authorized');
  });

  it('should redirect user to add information page if user does not exist', async () => {
    const { headers } = await request(app).get('/api/users').set('Cookie', global.signin()).send();

    expect(headers.location).not.toBeNull();
  });

  it.todo('should redirect with specific url');

  it('should return user information if user already add information', async () => {
    const { user } = await setup();

    const { body: res } = await request(app)
      .get('/api/users')
      .set('Cookie', global.signin(user.id))
      .send()
      .expect(200);

    expect(res.id).toEqual(user.id);
    expect(res.name).toEqual(user.name);
    expect(res.image).toEqual(user.image);
  });

  it('return user must include interests', async () => {
    const { user } = await setup();

    const { body: res } = await request(app)
      .get('/api/users')
      .set('Cookie', global.signin(user.id))
      .send()
      .expect(200);

    expect(res.id).toEqual(user.id);
    expect(res.name).toEqual(user.name);
    expect(res.interests).not.toBeNull();
    expect(res.interests[0].description).toEqual(Business.BusinessCase);
  });
});

describe('view user profile', () => {
  it('should return 400 if user is not fill info', async () => {
    await request(app)
      .get('/api/users/asfadfadfa')
      .set('Cookie', global.signin())
      .send({})
      .expect(400);
  });

  it('should return 404 if profile of the given user is not exist', async () => {
    const { user } = await setup();

    await request(app)
      .get('/api/users/613177221')
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(404);
  });

  it('should return user information with status null if user view his/her own profile', async () => {
    const { user } = await setup();

    const { body: res } = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.name).toEqual(user.name);
    expect(res.id).toEqual(user.id);
    expect(res.status).toBeNull();
  });

  it('should return user information with status toBeDefined if they are not friend', async () => {
    const { user } = await setup();

    const someone = await User.create({
      id: '6131778921',
      name: 'friend',
    });

    const { body: res } = await request(app)
      .get(`/api/users/${someone.id}`)
      .set('Cookie', global.signin(user.id))
      .send({})
      .expect(200);

    expect(res.name).toEqual(someone.name);
    expect(res.id).toEqual(someone.id);
    expect(res.status).toEqual(FriendStatus.toBeDefined);
  });
});
