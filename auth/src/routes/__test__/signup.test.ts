import { app } from '../app';
import request from 'supertest';
import User from '../../models/user.model';
import { faculty, getCurrentYear, getYearFromId } from '@cuconnex/common';



describe('Sign up test', () => {
    it('should return 400 if email is not supplied', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                password: "adsfadfasd",
                id: "adsfasdfasdf"
            })
            .expect(400)

    });

    it('should return 400 if email is not valid', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                email: "adfadfa",
                password: "adsfadfasd",
                id: "adsfasdfasdf"
            })
            .expect(400)
    });

    it('should return 400 if password is not supplied', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                email: "test@test.com",
                id: "adsfasdfasdf"
            })
            .expect(400)
    });

    it('should return 400 if student id is not supplied', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                email: "test@test.com",
                password: "adsfadfasd",
            })
            .expect(400)
    });

    it('should return 400 if email already existed', async () => {
        await User.create({
            id: "6131886621",
            email: "test@test.com",
            password: "test",
        });

        const { body: res } = await request(app)
            .post('/api/auth/signup')
            .send({
                email: "test@test.com",
                password: "adsfadfasd",
                id: "6131886621"
            })
            .expect(400)

        expect(res.errors[0].message).toEqual('User existed');

    });

    it('should create user on valid input', async () => {
        const userInput = {
            email: "test@test.com",
            password: "adsfadfasd",
            id: "6131886621"
        }
        const { body: res } = await request(app)
            .post('/api/auth/signup')
            .send(userInput)
            .expect(201)

        expect(res.email).toEqual(userInput.email);
        expect(res.id).toEqual(userInput.id);
        expect(res.password).not.toBeDefined();
        expect(res.faculty).toEqual(faculty["21"]);
        expect(res.year).toEqual(+getCurrentYear() - +getYearFromId(userInput.id))

    });

    it('should set cookie once successfully sign up', async () => {
        const userInput = {
            email: "test@test.com",
            password: "adsfadfasd",
            id: "6131886621"
        }
        const res = await request(app)
            .post('/api/auth/signup')
            .send(userInput)
            .expect(201)

        expect(res.get('Set-Cookie')).toBeDefined();
    });

});


