import { InterestDescription } from '@cuconnex/common';
import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';

describe('Search Test', () => {
  it('should return 401 if user is not authenticated', async () => {
    await request(app)
      .get(`/api/users/adsfafasfasdfa`)
      .send({})
      .expect(401);
  });

  it('should return a corresponding user(s) for the given username sort by username length', async () => {
    const user1 = await User.create({ id: '6131886621', username: 'pal' });
    const user2 = await User.create({ id: '6131776621', username: 'bob' });
    const user3 = await User.create({ id: '6131776631', username: 'palllllll' });
    const user4 = await User.create({ id: '6131e76631', username: 'palalcc' });

    const { body: res } = await request(app)
      .get(`/api/users/${user1.username}`)
      .set('Cookie', global.signin(user2.id))
      .send({});

    expect(res).toHaveLength(3);
    const transformed = res.map((user: { id: string; username: string }) => user.username);
    expect(transformed[0]).toEqual(user1.username);
    expect(transformed[1]).toContain(user4.username);
    expect(transformed[2]).toContain(user3.username);
  });
  it('should return a corresponding team(s) for the given name sort by name length', async () => {
    const user = await User.create({ id: '1', username: 'testUser' });
    await user.createTeams({ name: 'testTeam1' });
    await user.createTeams({ name: 'testTeam2' });
    await user.createTeams({ name: 'testTeam3' });
    await user.createTeams({ name: 'Somsan Tech' });
    await user.createTeams({ name: 'Super Mario' });

    const { body: res } = await request(app)
      .get(`/api/teams/testTeam`)
      .set('Cookie', global.signin(user.id))
      .send({});

    expect(res).toHaveLength(3);
    const transformed = res.map((team: { name: string }) => team.name);
    expect(transformed[0]).toEqual('testTeam1');
    expect(transformed[1]).toEqual('testTeam2');
    expect(transformed[2]).toEqual('testTeam3');

    // -----------------
    const { body: res2 } = await request(app)
      .get(`/api/teams/s`)
      .set('Cookie', global.signin(user.id))
      .send({});

    expect(res2).toHaveLength(2);
    const transformed2 = res2.map((team: { name: string }) => team.name);
    expect(transformed2[0]).toEqual('Somsan Tech');
    expect(transformed2[1]).toEqual('Super Mario');
  });

  it('should return a corresponding user(s) for the given id', async () => {
    const user1 = await User.create({ id: '6131886621', username: 'pal' });
    const user2 = await User.create({ id: '6131776621', username: 'bob' });
    const user3 = await User.create({ id: '6131776631', username: 'palllllll' });

    const { body: res } = await request(app)
      .get(`/api/users/${user1.id}`)
      .set('Cookie', global.signin(user2.id))
      .send({});

    expect(res).toHaveLength(1);
    expect(res[0].id).toEqual(user1.id);
    expect(res[0].username).toEqual(user1.username);
  });

  // for user search
  it('should return empty array if the input params does not match any attribute in db', async () => {
    const id = '6131767621';
    await User.create({ id, username: 'test' });
    const { body: res } = await request(app)
      .get(`/api/users/adfasdfasdfafds`)
      .set('Cookie', global.signin(id))
      .send({});

    expect(res).not.toBeNull();
    expect(res).toHaveLength(0);
  });

  it('should include interest in the response', async () => {
    const user = await User.create({ id: '6131886621', username: 'pal' });
    const user2 = await User.create({ id: '6131776621', username: 'bob' });
    await user.createInterests({ description: InterestDescription.Developer });

    const { body: res } = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Cookie', global.signin(user2.id))
      .send({});

    expect(res[0].interests).toBeDefined();
    expect(res[0].interests[0].description).toEqual(InterestDescription.Developer);
  });

  it('should return a corresponding team(s) for the given name sort by name length', async () => {
    const user = await User.create({ id: '1', username: 'testUser' });
    await user.createTeams({ name: 'testTeam1' });
    await user.createTeams({ name: 'testTeam2' });
    await user.createTeams({ name: 'testTeam3' });
    await user.createTeams({ name: 'Somsan Tech' });
    await user.createTeams({ name: 'Super Mario' });
    const { body: res } = await request(app)
      .get(`/api/teams/afasfasf`)
      .set('Cookie', global.signin(user.id))
      .send({});

    expect(res).not.toBeNull();
    expect(res).toHaveLength(0);
  });

  it.todo('should send data in specific pattern');
});
