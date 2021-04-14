import { Technology } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../app';
import { Interest, User } from '../../models';

it('should return 401 if user not signin', async () => {
    await request(app)
        .get("/api/users/friends")
        .send({})
        .expect(401);


})

it('should return 400 if user  not existed', async () => {
    await request(app)
        .get("/api/users/friends")
        .set('Cookie', global.signin())
        .send({})
        .expect(400);


});


it('should return users connections if user exist', async () => {

    const user1 = await User.create({ id: "6131775521", name: "test_1" })
    const user2 = await User.create({ id: "6131775621", name: "test_2" })
    const user3 = await User.create({ id: "6131775721", name: "test_3" })
    await user1.addConnection(user2);
    await user1.addConnection(user3);



    const { body } = await request(app)
        .get("/api/users/friends")
        .set('Cookie', global.signin(user1.id))
        .send({})
    // .expect(200);

    expect(body.connections).toHaveLength(2)


});

it('should include connections interest', async () => {
    const user1 = await User.create({ id: "6131775521", name: "test_1" })
    const user2 = await User.create({ id: "6131775621", name: "test_2" })
    const user3 = await User.create({ id: "6131775721", name: "test_3" })
    await user1.addConnection(user2);
    await user1.addConnection(user3);

    const coding = await Interest.findOne({ where: { description: Technology.Coding } })
    if (coding) {
        await user2.addInterest(coding)
    }

    const { body } = await request(app)
        .get("/api/users/friends")
        .set('Cookie', global.signin(user1.id))
        .send({})
    // .expect(200);

    expect(body.connections).toHaveLength(2)
    expect(body.connections[0].interests).toBeDefined()
    expect(body.connections[0].interests).toHaveLength(1)
});