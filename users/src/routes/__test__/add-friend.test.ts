import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';
import { Friend } from '../../models/friend.model';
import { FriendStatus } from '@cuconnex/common';
import { isYieldExpression } from 'typescript';



describe('sending friend request test ', () => {



    it(`should return 400 with 'Please fill the information form' if user does not fill info`, async () => {
        const { body: res } = await request(app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin())
            .send({ userId: 'adfasdfasfa' })
            .expect(400);

        expect(res.errors[0].message).toEqual('Please fill the information form');
    });

    it(`should return 404  if user who is added does not exist`, async () => {
        const user = await User.create({ id: "6131886621", name: 'test' });

        const { body: res } = await request(app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin(user.id))
            .send({ userId: 'adfasdfasfa' })
            .expect(404);

    });


    it('should save added user in friend table with status "Pending" ', async () => {
        const user1 = await User.create({ id: "6131886621", name: "alice" });
        const user2 = await User.create({ id: "6131776621", name: "bob" });

        await request(app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin(user1.id))
            .send({ userId: user2.id })
            .expect(201);



        const relation = await Friend.findAll({ where: { senderId: user1.id, receiverId: user2.id } });

        expect(relation).not.toBeNull();
        expect(relation).toHaveLength(1);
        expect(relation[0].status).toEqual(FriendStatus.Pending);

    });

    it('not allows add friend if relation already exist (AB = BA)', async () => {
        const sender = await User.create({ id: "6131778899", name: "sender" });
        const receiver = await User.create({ id: "6131772899", name: "receiver" });

        await sender.addFriend(receiver);


        await request(app)
            .post('/api/users/add-friend')
            .set('Cookie', global.signin(receiver.id))
            .send({ userId: sender.id })
            .expect(201);

        const result = await Friend.findOne({ where: { senderId: receiver.id, receiverId: sender.id } })
        expect(result).toBeNull();

    });
});


describe(' accept friend request ', () => {

    it('should reject request (return 400) on invalid req parameter', async () => {
        const sender = await User.create({ id: "6131778899", name: "sender" });
        const receiver = await User.create({ id: "6131772899", name: "receiver" });

        await sender.addFriend(receiver);

        await request(app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
                userId: sender.id,
                accepted: "Hello",
            })
            .expect(400);
    });

    it('should reject request if relation does not exists', async () => {
        const sender = await User.create({ id: "6131778899", name: "sender" });
        const receiver = await User.create({ id: "6131772899", name: "receiver" });

        await request(app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
                userId: sender.id,
                accepted: true,
            })
            .expect(400);
    });

    it('should update relation status on accepted', async () => {
        const sender = await User.create({ id: "6131778899", name: "sender" });
        const receiver = await User.create({ id: "6131772899", name: "receiver" });

        await sender.addFriend(receiver);

        await request(app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
                userId: sender.id,
                accepted: true,
            })
            .expect(201);

        const relation = await sender.findRelation(receiver.id);
        expect(relation).toEqual(FriendStatus.Accept);
    });

    it('should update relation status on rejected', async () => {
        const sender = await User.create({ id: "6131778899", name: "sender" });
        const receiver = await User.create({ id: "6131772899", name: "receiver" });

        await sender.addFriend(receiver);

        await request(app)
            .post('/api/users/add-friend/result')
            .set('Cookie', global.signin(receiver.id))
            .send({
                userId: sender.id,
                accepted: false,
            })
            .expect(201);

        const relation = await sender.findRelation(receiver.id);
        expect(relation).toEqual(FriendStatus.Reject);
    });
});
