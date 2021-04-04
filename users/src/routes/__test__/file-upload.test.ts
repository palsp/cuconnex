
import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';

describe('The /api/upload', () => {
    it('should return 400 if there is no file uploaded', async () => {
        await request(app)
            .post('/api/upload')
            .send({ username: 'test' })
            .expect(400)
            .then(response => {
                expect(response.body.errors[0].message).toEqual("Please include a file!!")
            });
    });
    it('should return 400 if the file uploaded is of the wrong type', async () => {
        await request(app)
            .post('/api/upload')
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg.zip')
            .expect(400)
            .then(response => {
                expect(response.body.errors[0].message).toEqual("Image uploaded is not of type jpg/jpeg or png")
            });
            
        
    });
    it('should return 200 if there is a valid file uploaded', async () => {
        await request(app)
            .post('/api/upload')
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
            .field({name: 'Anon'})
            .expect(200)
            .then(res => expect(res.body).toEqual("You've successfully uploaded the file: testImage.jpg It is now stored as Unknown_profile_pic.jpeg"));
    })
})