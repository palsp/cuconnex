import request from 'supertest';
import { app } from '../app';

it('should clear cookies after signout', async () => {
    await global.signup();


    const res = await request(app)
        .post("/api/auth/signout")
        .send({})
        .expect(200)


    expect(res.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});
