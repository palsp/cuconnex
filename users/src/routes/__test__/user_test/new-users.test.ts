import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models/user.model';
import { InterestDescription, Technology, getCurrentYear, getYearFromId, faculty } from '@cuconnex/common';

it('should return 400 if users send invalid type of interest list', async () => {
  await request(app)
    .post('/api/users')
    .set('Cookie', global.signin())
    .send({
      username: 'test',
      interests: InterestDescription.Business,
    })
    .expect(400);
});

it('should return 400 if user info already existed', async () => {
  const id = '6131886621';
  const cookies = global.signin(id);
  await User.create({
    id: '6131886621',
    name: 'pal',
  });
  const { body } = await request(app)
    .post('/api/users')
    .set('Cookie', cookies)
    .send({
      name: 'test',
      interests: {
        Technology: [],
      },
    })
    .expect(400);

  expect(body.errors[0].message).toEqual('User already existed');
});

it('should return 400 if users send interests list with invalid category field', async () => {
  const { body } = await request(app)
    .post('/api/users')
    .set('Cookie', global.signin())
    .send({
      name: 'test',
      interests: {
        invalid: [],
      },
    })
    .expect(400);

  expect(body.errors[0].message).toEqual('Valid interest must be provided');
});

it('should return 400 if users send valid category name but value is not array', async () => {
  const { body } = await request(app)
    .post('/api/users')
    .set('Cookie', global.signin())
    .send({
      name: 'test',
      interests: {
        Technology: 'Hello',
      },
    })
    .expect(400);

  expect(body.errors[0].message).toEqual('Valid interest must be provided');
});

it('should return 401 if users is not login', async () => {
  const { body } = await request(app)
    .post('/api/users')
    .send({
      name: 'test',
      interests: {
        Technology: [],
      },
    })
    .expect(401);

  expect(body.errors[0].message).toEqual('Not Authorized');
});

it('should create a users with interests on valid input', async () => {
  await request(app)
    .post('/api/users')
    .set('Cookie', global.signin())
    .send({
      interests: {
        Technology: [Technology.Coding],
      },
      name: 'test',
    })
    .expect(201);
});

it('should not save duplicate interest list', async () => {
  const { body: user } = await request(app)
    .post('/api/users')
    .set('Cookie', global.signin())
    .send({
      interests: {
        Technology: [Technology.Coding, Technology.Coding],
      },
      name: 'test',
    })
    .expect(201);

  const currentUser = await User.findOne({ where: { id: user.id } });
  expect(await currentUser?.getInterests()).toHaveLength(1);
});


// it('should create user successfully with optional field', async () => {
//   const id = '6131776621';
//   const user = {
//     interests: {
//       Technology: [Technology.Coding, Technology.Coding],
//     },
//     name: 'test',
//     role: 'developer',
//     bio: 'I am the best programmer in the world',
//   };
//   const { body } = await request(app)
//     .post('/api/users')
//     .set('Cookie', global.signin(id))
//     .send({
//       ...user,
//     })
//     .expect(201);


//   const saveUser = await User.findOne({ where: { id } });
//   expect(saveUser).not.toBeNull();
//   const year = (+getCurrentYear() - +getYearFromId(saveUser!.id)).toString()
//   expect(saveUser!.name).toEqual(user.name);
//   expect(saveUser!.year).toEqual(year);
//   expect(saveUser!.faculty).toEqual(faculty["21"])
//   expect(saveUser!.role).toEqual(user.role);
//   expect(saveUser!.bio).toEqual(user.bio);
// });

// it.todo('add interest by category');
