import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models/user.model';
import { Interest } from '../../../models/interest.model';
import { FriendStatus, Business, Technology } from '@cuconnex/common';
import { IUserRequest } from '../../../interfaces'
import { deleteFile } from '../../../utils/file';

const setup = async (id?: string, name?: string) => {
    const user = await User.create({
        id: id || '6131898121',
        name: name || 'Anon',
        image: 'src/routes/__test__/test_images/testImage copy.jpg',
        bio: "Hello",
    });

    const interest = await Interest.findOne({
        where: { description: Business.BusinessCase },
    });

    await user.addInterest(interest!);

    return { user, interest };
};
describe('The edit User route', () => {
    it('should return 401 if user not signed in', async () => {
        await request(app)
            .put('/api/users/6131898121')
            .send({ hello: "hello" })
            .expect(401)
    });

    it('should return 400 if  fields are missing', async () => {
        const { user } = await setup();
        const { body: res } = await request(app)
            .put('/api/users')
            .set('Cookie', global.signin(user.id))
            .send({})
            .expect(400)
        expect(res.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    message: 'Name must be supplied'
                }),
                expect.objectContaining({
                    message: 'lookingForTeam must be supplied'
                }),
                expect.objectContaining({
                    message: "Bio must be supplied"
                }),
            ])
        )
    });


    it('should return 200 and updated user information', async () => {
        const { user } = await setup();
        const updatedInformation = {
            name: 'John',
            lookingForTeam: true,
            role: "I am a developer",
            bio: "test somthing",
            interests: {
                Technology: [Technology.Coding],
            }
        }
        const { body: res } = await request(app)
            .put('/api/users')
            .set('Cookie', global.signin(user.id))
            .send(updatedInformation)
            .expect(200);
        const updatedUser = await User.fetchUser(user.id);
        expect(updatedUser!.name).toEqual(updatedInformation.name);
        expect(updatedUser!.lookingForTeam).toEqual(updatedInformation.lookingForTeam);
        expect(updatedUser!.bio).toEqual(updatedInformation.bio);
        expect(updatedUser!.interests).toHaveLength(1)



    });




    it('should return 200 when a new file is uploaded and update the file accordingly', async () => {
        const updatedInformation = {
            name: 'John',
            lookingForTeam: true,
            role: "I am a developer",
            bio: "test somthing",
        }

        const { body: user } = await request(app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .field({
                name: 'Anon',
                interests: JSON.stringify({ Technology: [Technology.Coding] })
            })
            .attach('image', 'src/routes/__test__/test_images/testImage.jpg')
            .expect(201)


        const { body: res } = await request(app)
            .put('/api/users')
            .set('Cookie', global.signin(user.id))
            .field(updatedInformation)
            .attach('image', 'src/routes/__test__/test_images/testImage2.png')
            .expect(200)

        const updatedUser = await User.fetchUser(user.id);
        expect(updatedUser!.image).not.toEqual('');
        expect(updatedUser!.image).not.toEqual(user.image);
        deleteFile(updatedUser!.image);


    });


    it('should return 200 with the old file if no new files are uploaded', async () => {
        const updatedInformation = {
            name: 'John',
            lookingForTeam: true,
            role: "I am a developer",
            bio: "test somthing",
        }

        const { body: user } = await request(app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .field({
                name: 'Anon',
                interests: JSON.stringify({ Technology: [Technology.Coding] })
            })
            .attach('image', 'src/routes/__test__/test_images/testImage.jpg')
            .expect(201)


        const { body: res } = await request(app)
            .put('/api/users')
            .set('Cookie', global.signin(user.id))
            .field(updatedInformation)
            .expect(200)

        const updatedUser = await User.fetchUser(user.id);
        expect(updatedUser!.image).not.toEqual('');
        expect(updatedUser!.image).toEqual(user.image);
        deleteFile(updatedUser!.image);

    });
});