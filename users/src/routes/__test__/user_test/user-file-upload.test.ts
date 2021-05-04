import { Technology } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../../app';
import { deleteFile } from '../../../utils/file';
import { insertFaculties } from '../../../utils/insertFaculties';

describe('The /api/upload', () => {
  it('should return 401 - Not Auhtorized if user is not signin', async () => {
    await request(app)
      .post('/api/users')
      .field({ interests: JSON.stringify({ Technology: [Technology.Coding] }), name: 'Anon' })
      .attach('image', 'src/routes/__test__/test_images/testImage.jpg')
      .expect(401);
  });

  it('should return 400 if the file uploaded is of the wrong type', async () => {
    await request(app)
      .post('/api/users')
      .set('Cookie', global.signin())
      .attach('image', 'src/routes/__test__/test_images/testImage.jpg.zip')
      .expect(400)
      .then((response) => {
        expect(response.body.errors[0].message).toEqual(
          'Image uploaded is not of type jpg/jpeg or png'
        );
      });
  });

  it('should return 201 if there is a valid file uploaded', async () => {
    // await insertFaculties();

    const { body: res } = await request(app)
      .post('/api/users')
      .set('Cookie', global.signin())
      .field({
        name: 'Anon',
        interests: JSON.stringify({ Technology: [Technology.Coding] }),
      })
      .attach('image', 'src/routes/__test__/test_images/testImage2.png')
      // .attach('image', 'src/assets/faculties/college_of_population_studies.png')
      .expect(201);
    // console.log('rr', res);

    expect(res.image).not.toEqual('');
    deleteFile(res.image);
  });

  it('should create user although file is not attached', async () => {
    const { body } = await request(app)
      .post('/api/users')
      .set('Cookie', global.signin())
      .send({
        name: 'Anon',
        interests: {},
      })
      .expect(201);

    expect(body.image).toEqual('');
  });
});
