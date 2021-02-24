import { app } from '../app';
import request from 'supertest';


const signup = async () => {
    const sid = '6131776621'
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            sid,
            email,
            password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie');
    return { cookie, email, password, sid };
}

describe('Sign in test', () => {
    it('should return 400 if email is not supplied', async () => {

        await request(app)
            .post('/api/auth/signin')
            .send({
                password: "asdfasdfa"
            })
            .expect(400);


    });

    it('should return 400 if email is not valid', async () => {
        await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'asdfasfasdf',
                password: "asdfasdfa"
            })
            .expect(400);
    });

    it('should return 400 if password is not supplied', async () => {
        await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'test@test.com',
            })
            .expect(400);
    });

    it('should return 400 if email doesn not exists', async () => {
        const { body: res } = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'test@test.com',
                password: "asdfasdfa"
            })
            .expect(400);

        expect(res.errors[0].message).toEqual('Invalid credentials')
    });

    it('should return 400 if password is not matched', async () => {
        const { email, password } = await signup();
        const { body: res } = await request(app)
            .post('/api/auth/signin')
            .send({
                email,
                password: "asdfasdfa"
            })
            .expect(400);
    });

    it('should signin user if password match', async () => {
        const { email, password, sid } = await signup();
        const { body: res } = await request(app)
            .post('/api/auth/signin')
            .send({
                email,
                password,
            })
            .expect(200);

        expect(res.email).toEqual(email);
        expect(res.sid).toEqual(sid);

    });

    it('should not send user password with the response', async () => {
        const { email, password, sid } = await signup();
        const { body: res } = await request(app)
            .post('/api/auth/signin')
            .send({
                email,
                password,
            })
            .expect(200);

        expect(res.password).not.toBeDefined();
    });

    it('should set cookie once successfully sign in', async () => {
        const { email, password } = await signup();
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email,
                password,
            })
            .expect(200);

        expect(res.get('Set-Cookie')).toBeDefined();
    });

});