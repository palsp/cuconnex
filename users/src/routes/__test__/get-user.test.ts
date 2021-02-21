
import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';
import { InterestDescription } from '@cuconnex/common'



it('should return 401 if user is not authenticated', async () => {


    const { body } = await request(app)
        .get('/api/users')
        .send()
        .expect(401);

    expect(body.errors[0].message).toEqual('Not Authorized')

});


it('should redirect user to add information page if user does not exist', async () => {

    const { headers } = await request(app)
        .get('/api/users')
        .set('Cookie', global.signin())
        .send()

    expect(headers.location).not.toBeNull();

});


it.todo('should redirect with specific url')

it('should user information if user already add information', async () => {
    const id = "6131778821"
    const user = await User.create({ name: "pal", id });
    await user.createInterests({ description: InterestDescription.Business });

    const { body: res } = await request(app)
        .get('/api/users')
        .set('Cookie', global.signin(id))
        .send()
        .expect(200);

    expect(res.id).toEqual(user.id);
    expect(res.name).toEqual(user.name);

})

it('return user must include interests', async () => {
    const id = "6131778821"
    const user = await User.create({ name: "pal", id });
    await user.createInterests({ description: InterestDescription.Business });


    const { body: res } = await request(app)
        .get('/api/users')
        .set('Cookie', global.signin(id))
        .send()
        .expect(200);

    expect(res.id).toEqual(user.id);
    expect(res.name).toEqual(user.name);
    expect(res.interests).not.toBeNull();
    expect(res.interests[0].description).toEqual(InterestDescription.Business);
})

