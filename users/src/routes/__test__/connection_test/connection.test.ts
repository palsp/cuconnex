import { FriendStatus, Technology } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../../app';
import { Interest, User } from '../../../models';



describe('Get Connections', () => {

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


    it('should return not include user with connection status is pending', async () => {

        const user1 = await User.create({ id: "6131775521", name: "test_1" })
        const user2 = await User.create({ id: "6131775621", name: "test_2" })
        await user1.addConnection(user2);

        const { body } = await request(app)
            .get("/api/users/friends")
            .set('Cookie', global.signin(user1.id))
            .send({})
            .expect(200);

        expect(body.connections).toHaveLength(0)


    });

    it('should return not include user with connection status is rejected', async () => {

        const user1 = await User.create({ id: "6131775521", name: "test_1" })
        const user2 = await User.create({ id: "6131775621", name: "test_2" })
        await user1.addConnection(user2);

        await user2.acceptConnection(user1.id, false);

        const { body } = await request(app)
            .get("/api/users/friends")
            .set('Cookie', global.signin(user1.id))
            .send({})
            .expect(200);

        expect(body.connections).toHaveLength(0)


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

        await user2.acceptConnection(user1.id, true);

        const { body } = await request(app)
            .get("/api/users/friends")
            .set('Cookie', global.signin(user1.id))
            .send({})
            .expect(200);

        expect(body.connections).toHaveLength(1)
        expect(body.connections[0].interests).toBeDefined()
        expect(body.connections[0].interests).toHaveLength(1)
    });
});


describe('Get Friend Request', () => {
    it('should return 401 if user not signin', async () => {
        await request(app)
            .get("/api/users/friends/request")
            .send({})
            .expect(401);


    })

    it('should return 400 if user  not existed', async () => {
        await request(app)
            .get("/api/users/friends/request")
            .set('Cookie', global.signin())
            .send({})
            .expect(400);

    });

    it('should return users frined request if user exist', async () => {

        const user1 = await User.create({ id: "6131775521", name: "test_1" })
        const user2 = await User.create({ id: "6131775621", name: "test_2" })
        const user3 = await User.create({ id: "6131775721", name: "test_3" })
        await user1.requestConnection(user2);
        await user1.requestConnection(user3);

        const { body } = await request(app)
            .get("/api/users/friends/request")
            .set('Cookie', global.signin(user1.id))
            .send({})
            .expect(200);

        expect(body.requests).toHaveLength(2)

    });

    it('should return users frined request only the user with status pending', async () => {

        const user1 = await User.create({ id: "6131775521", name: "test_1" })
        const user2 = await User.create({ id: "6131775621", name: "test_2" })
        const user3 = await User.create({ id: "6131775721", name: "test_3" })
        await user1.requestConnection(user2);
        await user1.addConnection(user3);

        await user3.acceptConnection(user1.id, true);



        const { body } = await request(app)
            .get("/api/users/friends/request")
            .set('Cookie', global.signin(user1.id))
            .send({})
            .expect(200);

        expect(body.requests).toHaveLength(1)

    });
});
describe('The Received connections route', () => {
    it('should return all received connection requests with pending status', async () => {
        const user1 = await User.create({ id: "6131775521", name: "test_1" })
        const user2 = await User.create({ id: "6131775621", name: "test_2" })
        const user3 = await User.create({ id: "6131775721", name: "test_3" })
        await user1.requestConnection(user2);
        await user2.requestConnection(user3);
        console.log(user2.getReceivedFriendRequests())
        const { body } = await request(app)
            .get("/api/users/friends/request/received")
            .set('Cookie', global.signin(user2.id))
            .send({})
            .expect(200);
        expect(body.requests).toHaveLength(1)
        expect(body.requests[0].name).toEqual("test_1");
    });
    it('should return all received connection requests with pending status if there are multiple', async () => {
        const user1 = await User.create({ id: "6131775521", name: "test_1" })
        const user2 = await User.create({ id: "6131775621", name: "test_2" })
        const user3 = await User.create({ id: "6131775721", name: "test_3" })
        await user1.requestConnection(user2);
        await user3.requestConnection(user2);
        const { body } = await request(app)
            .get("/api/users/friends/request/received")
            .set('Cookie', global.signin(user2.id))
            .send({})
            .expect(200);
        expect(body.requests).toHaveLength(2)
        expect(body.requests[0].name).toEqual("test_1");
        expect(body.requests[1].name).toEqual("test_3");
    });
});