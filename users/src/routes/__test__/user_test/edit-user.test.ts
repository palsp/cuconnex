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
            .then((res) =>{
                console.log(res.body.errors[0].message);
            })
        
    });
    it('should return 400 if neither the name or bio fields are provided', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ })
            .expect(400)
            .then((res) =>{
                expect(res.body.errors[0].message).toEqual("Empty request!");
                console.log(res.body.errors[0].message);
            })
        
    });
    it('should return 400 if a duplicate field is specified and it is the only field', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ name: 'Anon' })
            .expect(400)
            .then((res) =>{
                expect(res.body.errors[0].message).toEqual("Your name is the same!!");
                console.log(res.body.errors[0].message);
            })
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ bio: "Hello" })
            .expect(400)
            .then((res) => {
                expect(res.body.errors[0].message).toEqual("Your bio is the same!!");
                console.log(res.body.errors[0].message);
            })
    });
    it('should work fine if a duplicate field is entered alongside none duplicate', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ name: 'Anon', bio: "Hello there" })
            .expect(200)
            .then((res) => {
                expect(res.body.name).toEqual('Anon');
                expect(res.body.bio).toEqual('Hello there');
            })
    });
    it('should return 200 if name is specified and should update only the name', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ name: 'John' })
            .expect(200)
            .then((res) =>{
                console.log(res.body);
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
                console.log(res.body);
                expect(res.body.name).toEqual('Anon');
                expect(res.body.bio).toEqual('Hello my name is Anon');
            })
    });

    it('should return 200 if both are specified and update both fields', async () => {
        const { user } = await setup();
        await request(app)
            .put('/api/users/6131898121')
            .set('Cookie', global.signin(user.id))
            .send({ bio: 'Hello my name is Anon', name: 'John' })
            .expect(200)
            .then((res) => {
                console.log(res.body);
                expect(res.body.name).toEqual('John');
                expect(res.body.bio).toEqual('Hello my name is Anon');
            })
    });
});