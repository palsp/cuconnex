import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../models/user.model';
import { Connection } from '../../../models/connection.model';
import { FriendStatus, } from '@cuconnex/common';




const setup = async () => {
  const sender = await User.create({
    id: "6131886621",
    name: "pal"
  });

  const receiver = await User.create({
    id: "6131776621",
    name: "receiver"
  });

  return { sender, receiver }
};

describe('sending friend request test ', () => {
  it(`should return 400 with 'Please fill the information form' if user does not fill info`, async () => {

    const receiver = await User.create({
      id: '6131886622',
      name: 'pal2'
    });
    const { body: res } = await request(app)
      .post('/api/users/add-friend')
      .set('Cookie', global.signin())
      .send({ userId: receiver.id })
      .expect(400);

    expect(res.errors[0].message).toEqual('Please fill the information form first.');
  });

  it(`should return 404  if user who is added does not exist`, async () => {
    const { sender } = await setup();

    await request(app)
      .post('/api/users/add-friend')
      .set('Cookie', global.signin(sender.id))
      .send({ userId: 'adfasdfasfa' })
      .expect(404);
  });

  it('should save added user in friend table with status "Pending" ', async () => {
    const { sender, receiver } = await setup();
    const { body } = await request(app)
      .post('/api/users/add-friend')
      .set('Cookie', global.signin(sender.id))
      .send({ userId: receiver.id })

    const relation = await Connection.findAll({ where: { senderId: sender.id, receiverId: receiver.id } });


    expect(relation).not.toBeNull();
    expect(relation).toHaveLength(1);
    expect(relation[0].status).toEqual(FriendStatus.Pending);
  });

  it('not allows add friend if relation already exist (AB = BA)', async () => {
    const { sender, receiver } = await setup();

    await sender.addConnection(receiver);

    await request(app)
      .post('/api/users/add-friend')
      .set('Cookie', global.signin(receiver.id))
      .send({ userId: sender.id })
      .expect(201);

    const result = await Connection.findOne({
      where: { senderId: receiver.id, receiverId: sender.id }
    });
    expect(result).toBeNull();
  });
});



describe(' accept friend request ', () => {
  it('should reject request (return 400) on invalid req parameter', async () => {
    const { sender, receiver } = await setup();

    await sender.addConnection(receiver);

    await request(app)
      .post('/api/users/add-friend/result')
      .set('Cookie', global.signin(receiver.id))
      .send({
        userId: sender.id,
        accepted: 'Hello'
      })
      .expect(400);
  });

  it('should reject request if relation does not exists', async () => {
    const { sender, receiver } = await setup();

    await request(app)
      .post('/api/users/add-friend/result')
      .set('Cookie', global.signin(receiver.id))
      .send({
        userId: sender.id,
        accepted: true
      })
      .expect(400);
  });

  it('should update relation status on accepted', async () => {
    const { sender, receiver } = await setup();

    await sender.addConnection(receiver);

    await request(app)
      .post('/api/users/add-friend/result')
      .set('Cookie', global.signin(receiver.id))
      .send({
        userId: sender.id,
        accepted: true
      })
      .expect(201);


    const sendConn = await sender.getConnection();
    const rcvConn = await receiver.getConnection();
    expect(sendConn).toHaveLength(1)
    expect(rcvConn).toHaveLength(1)
    const SR = await sender.findRelation(receiver.id);
    const RS = await receiver.findRelation(sender.id);
    expect(SR).toEqual(FriendStatus.Accept);
    expect(RS).toEqual(FriendStatus.Accept);
  });

  it('should update relation status on rejected', async () => {

    const { sender, receiver } = await setup();


    await sender.addConnection(receiver);

    await request(app)
      .post('/api/users/add-friend/result')
      .set('Cookie', global.signin(receiver.id))
      .send({
        userId: sender.id,
        accepted: false
      })
      .expect(201);

    const sendConn = await sender.getConnection();
    const rcvConn = await receiver.getConnection();
    expect(sendConn).toHaveLength(1)
    expect(rcvConn).toHaveLength(0)
    const SR = await sender.findRelation(receiver.id);
    const RS = await receiver.findRelation(sender.id);
    expect(SR).toEqual(FriendStatus.toBeDefined);
    expect(RS).toEqual(FriendStatus.toBeDefined);

  });
});
