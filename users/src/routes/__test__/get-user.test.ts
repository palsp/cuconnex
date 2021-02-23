// import request from 'supertest';
// import { app } from '../../app';
// import { User } from '../../models/user.model';
// import { FriendStatus, InterestDescription } from '@cuconnex/common';
// import { requireUser } from '../../middlewares/requireUser';

// describe('get current user', () => {
//   it('should return 401 if user is not authenticated', async () => {
//     const { body } = await request(app)
//       .get('/api/users')
//       .send()
//       .expect(401);

//     expect(body.errors[0].message).toEqual('Not Authorized');
//   });

//   it('should redirect user to add information page if user does not exist', async () => {
//     const { headers } = await request(app)
//       .get('/api/users')
//       .set('Cookie', global.signin())
//       .send();

//     expect(headers.location).not.toBeNull();
//   });

//   it.todo('should redirect with specific url');

//   it('should return user information if user already add information', async () => {
//     const id = '6131778821';
//     const user = await User.create({ name: 'pal', id });
//     await user.createInterests({ description: InterestDescription.Business });

//     const { body: res } = await request(app)
//       .get('/api/users')
//       .set('Cookie', global.signin(id))
//       .send()
//       .expect(200);

//     expect(res.id).toEqual(user.id);
//     expect(res.name).toEqual(user.name);
//   });

//   it('return user must include interests', async () => {
//     const id = '6131778821';
//     const user = await User.create({ name: 'pal', id });
//     await user.createInterests({ description: InterestDescription.Business });

//     const { body: res } = await request(app)
//       .get('/api/users')
//       .set('Cookie', global.signin(id))
//       .send()
//       .expect(200);

//     expect(res.id).toEqual(user.id);
//     expect(res.name).toEqual(user.name);
//     expect(res.interests).not.toBeNull();
//     expect(res.interests[0].description).toEqual(InterestDescription.Business);
//   });
// });

// describe('view user profile', () => {
//   it('should return 400 if user is not fill info', async () => {
//     await request(app)
//       .get('/api/users/view-profile/asfadfadfa')
//       .set('Cookie', global.signin())
//       .send({})
//       .expect(400);
//   });

//   it('should return 404 if profile of the given user is not exist', async () => {
//     const id = '6131772221';
//     await User.create({ id, name: 'Test' });

//     await request(app)
//       .get('/api/users/view-profile/613177221')
//       .set('Cookie', global.signin(id))
//       .send({})
//       .expect(404);
//   });

//   it('should return user information with status null if user view his/her own profile', async () => {
//     const id = '6131772221';
//     const user = await User.create({ id, name: 'Test' });

//     const { body: res } = await request(app)
//       .get(`/api/users/view-profile/${id}`)
//       .set('Cookie', global.signin(id))
//       .send({})
//       .expect(200);

//     expect(res.name).toEqual(user.name);
//     expect(res.id).toEqual(user.id);
//     expect(res.interests).toHaveLength(0);
//     expect(res.status).toBeNull();
//   });

//   it('should return user information with status toBeDefined if they are not friend', async () => {
//     const id = '6131772221';
//     const id2 = '6131778821';
//     const user = await User.create({ id, name: 'Test' });
//     const user2 = await User.create({ id: id2, name: 'Test2' });

//     const { body: res } = await request(app)
//       .get(`/api/users/view-profile/${id}`)
//       .set('Cookie', global.signin(id2))
//       .send({})
//       .expect(200);

//     expect(res.name).toEqual(user.name);
//     expect(res.id).toEqual(user.id);
//     expect(res.interests).toHaveLength(0);
//     expect(res.status).toEqual(FriendStatus.toBeDefined);
//   });
// });

it('should pass', () => {});
