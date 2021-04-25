import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models/user.model';
import { Interest } from '../../../models/interest.model';
import { FriendStatus, Business } from '@cuconnex/common';

const setup = async (id?: string, name?: string) => {
    const user = await User.create({
        id: id || '6131898121',
        name: name || 'Anon',
        image: '/file/path',
        bio: "Hello"
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
            .send({ hello: "hello"})
            .expect(401)
    });
    it('should return 404 if there is no user with specified id', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/613')
            .set('Cookie', global.signin(user.id))
            .send({ name: 'John' })
            .expect(404)
    });
    it('should return 400 if no fields are provided', async () => {
        const { user } = await setup();
        const { body: res} = await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ })
            .expect(400)
        expect(res.errors[0].message).toEqual("Empty request!");
    });
    it('should return 400 if invalid fields are provided', async () => {
        const { user } = await setup();
        const { body: res } = await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ name: 4, bio: 2, year: 3 })
            .expect(400)
        console.log(res.errors);
        expect(res.errors).toEqual(          
            expect.arrayContaining([      
                expect.objectContaining({   
                    message: 'Year must be a string!'              
                }), 
                expect.objectContaining({
                    message: "Name is invalid"
                }),
                expect.objectContaining({
                    message: "Bio is invalid"
                }),
            ])
        )
    });
    it('should return 200 if name is specified and should update only the name', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ name: 'John' })
            .expect(200)
            .then((res) =>{
                expect(res.body.name).toEqual('John');
                expect(res.body.bio).toEqual('Hello');
            })
    });
    it('should return 200 if bio is specified and should update only the bio', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ bio: 'Hello my name is Anon' })
            .expect(200)
            .then((res) =>{
                expect(res.body.name).toEqual('Anon');
                expect(res.body.bio).toEqual('Hello my name is Anon');
            })
    });

    it('should return 200 if more than one fields are specified and update all specified fields', async () => {
        const { user } = await setup();
        const { body: res } = await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ bio: 'Hello my name is Anon', name: 'John', year: '3', faculty: 'Engineering' })
            .expect(200)
        expect(res.name).toEqual('John');
        expect(res.bio).toEqual('Hello my name is Anon');
        expect(res.year).toEqual('3');
        expect(res.faculty).toEqual('Engineering')
    });
});