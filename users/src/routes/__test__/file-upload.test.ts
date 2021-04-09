
import { Technology } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';
import { deleteFile } from '../../utils/file';

describe('The /api/upload', () => {


    it('should return 401 - Not Auhtorized if user is not signin', async () => {

        await request(app)
            .post('/api/users')
            .field({ interests: JSON.stringify({ Technology: [Technology.Coding] }), name: 'Anon' })
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
            .expect(401)

    });

    it('should return 400 if the file uploaded is of the wrong type', async () => {
        await request(app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg.zip')
            .expect(400)
            .then(response => {
                expect(response.body.errors[0].message).toEqual("Image uploaded is not of type jpg/jpeg or png")
            });


    });
    it('should return 201 if there is a valid file uploaded', async () => {
        const { body } = await request(app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .field({
                name: 'Anon',
                interests: JSON.stringify({ Technology: [Technology.Coding] })
            })
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
            .expect(201)

        expect(body.image).not.toEqual("")

        deleteFile(body.image)



    })

    it('should create user although file is not attached', async () => {
        const { body } = await request(app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .send({
                name: 'Anon',
                interests: {}
            })
            .expect(201);

        expect(body.image).toEqual("");
    });


    // describe('The /api/users endpoint with files', () => {
    //     it('should return 201 without interests', async () => {
    //         await request(app)
    //             .post('/api/users')
    //             .set('Cookie', global.signin())
    //             .field({
    //                 name: 'test' })
    //             .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
    //             .then(res => {
    //               expect(res.body.errors).toEqual(null);
    //             });
    //     });
});