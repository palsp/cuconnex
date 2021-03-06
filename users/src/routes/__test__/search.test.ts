import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';


const setup = async () => {
  const user1 = await User.create({
    id: '6131886621',
    name: 'pal'
  });

  const user2 = await User.create({
    id: '6131776621',
    name: 'bob'
  });
  const user3 = await User.create({
    id: '6131776631',
    name: 'palllllll'
  });
  const user4 = await User.create({
    id: '6131e76631',
    name: 'palalcc'
  });

  return [user1, user2, user3, user4]
};




// describe('Search Test', () => {
//   it('should return 401 if user is not authenticated', async () => {
//     await request(app)
//       .get(`/api/users/adsfafasfasdfa`)
//       .send({})
//       .expect(401);
//   });

//   it('should return a corresponding user(s) for the given name sort by name length', async () => {

//     const users = await setup();

//     const { body: res } = await request(app)
//       .get('/api/users/pal')
//       .set('Cookie', global.signin(users[1].id))
//       .send({});

//     expect(res).toHaveLength(3);
//     const transformed = res.map((user: { id: string; name: string }) => user.name);
//     expect(transformed[0]).toEqual(users[0].name);
//     expect(transformed[1]).toContain(users[3].name);
//     expect(transformed[2]).toContain(users[2].name);
//   });



//   it('should return a corresponding team(s) for the given name sort by name length', async () => {
//     const user = await User.create({
//       id: '6131886621',
//       name: 'pal'
//     });

//     await user.createTeams({ name: 'testTeam1', description: '' });
//     await user.createTeams({ name: 'testTeam2', description: '' });
//     await user.createTeams({ name: 'testTeam3', description: '' });
//     await user.createTeams({ name: 'Somsan Tech', description: '' });
//     await user.createTeams({ name: 'Super Mario', description: '' });

//     const { body: res } = await request(app)
//       .get(`/api/teams/testTeam`)
//       .set('Cookie', global.signin(user.id))
//       .send({});

//     expect(res).toHaveLength(3);
//     const transformed = res.map((team: { name: string }) => team.name);
//     expect(transformed[0]).toEqual('testTeam1');
//     expect(transformed[1]).toEqual('testTeam2');
//     expect(transformed[2]).toEqual('testTeam3');

//     // -----------------
//     const { body: res2 } = await request(app)
//       .get(`/api/teams/s`)
//       .set('Cookie', global.signin(user.id))
//       .send({});

//     expect(res2).toHaveLength(2);
//     const transformed2 = res2.map((team: { name: string }) => team.name);
//     expect(transformed2[0]).toEqual('Somsan Tech');
//     expect(transformed2[1]).toEqual('Super Mario');
//   });

//   it('should return a corresponding user(s) for the given id', async () => {


//     const users = await setup();

//     const { body: res } = await request(app)
//       .get(`/api/users/${users[0].id}`)
//       .set('Cookie', global.signin(users[1].id))
//       .send({});

//     expect(res).toHaveLength(1);
//     expect(res[0].id).toEqual(users[0].id);
//   });

//   // for user search
//   it('should return empty array if the input params does not match any attribute in db', async () => {
//     const users = await setup();

//     const { body: res } = await request(app)
//       .get(`/api/users/adfasdfasdfafds`)
//       .set('Cookie', global.signin(users[0].id))
//       .send({});

//     expect(res).not.toBeNull();
//     expect(res).toHaveLength(0);
//   });



//   it('should include interest in the response', async () => {

//     const users = await setup();

//     // await user.createInterests({ description: InterestDescription.Developer });
//     const interest = await Interest.findOne({
//       where: {
//         description: Technology.Coding,
//       }
//     });
//     await users[0].addInterest(interest!);

//     const { body: res } = await request(app)
//       .get(`/api/users/${users[0].id}`)
//       .set('Cookie', global.signin(users[0].id))
//       .send({});

//     expect(res[0].interests).toBeDefined();
//     expect(res[0].interests[0].description).toEqual(Technology.Coding);
//   });

//   it('should return a corresponding team(s) for the given name sort by name length', async () => {
//     const user = await User.create({
//       id: '6131886621',
//       name: 'pal'
//     });

//     await user.createTeams({ name: 'testTeam1', description: '' });
//     await user.createTeams({ name: 'testTeam2', description: '' });
//     await user.createTeams({ name: 'testTeam3', description: '' });
//     await user.createTeams({ name: 'Somsan Tech', description: '' });
//     await user.createTeams({ name: 'Super Mario', description: '' });
//     const { body: res } = await request(app)
//       .get(`/api/teams/afasfasf`)
//       .set('Cookie', global.signin(user.id))
//       .send({});

//     expect(res).not.toBeNull();
//     expect(res).toHaveLength(0);
//   });

//   it.todo('should send data in specific pattern');
// });

describe('General Search', () => {

  it('should return empty array if cannot find corresponding users and teams', async () => {
    const { body } = await request(app)
      .get(`/api/users/?keyword=empty`)
      .set('Cookie', global.signin())
      .send({})
    //   .expect(200);

    expect(body.users).toHaveLength(0);
    expect(body.team).toHaveLength(0);
  })

  it('retuens corresponding user matched with given name as a keyword', async () => {
    const users = (await setup());
    await users[0].createTeams({ name: 'testTeam1', description: '' });
    await users[0].createTeams({ name: 'testTeam2', description: '' });
    await users[0].createTeams({ name: 'testTeam3', description: '' });

    const { body } = await request(app)
      .get(`/api/users/?keyword=${users[0].name}`)
      .set('Cookie', global.signin())
      .send({})
      .expect(200);

    expect(body.users).toHaveLength(3);
    expect(body.team).toHaveLength(0);
  });

  it('retuens corresponding user matched with given id as a keyword', async () => {
    const users = (await setup());
    await users[0].createTeams({ name: 'testTeam1', description: '' });
    await users[0].createTeams({ name: 'testTeam2', description: '' });
    await users[0].createTeams({ name: 'testTeam3', description: '' });

    const { body } = await request(app)
      .get(`/api/users/?keyword=${users[0].id}`)
      .set('Cookie', global.signin())
      .send({})
      .expect(200);

    expect(body.users).toHaveLength(1);
    expect(body.team).toHaveLength(0);
  });

  it('retuens corresponding team matched with given keyword', async () => {
    const users = (await setup());
    await users[0].createTeams({ name: 'testTeam1', description: '' });
    await users[0].createTeams({ name: 'testTeam2', description: '' });
    await users[0].createTeams({ name: 'testTeam3', description: '' });

    const { body } = await request(app)
      .get(`/api/users/?keyword=test`)
      .set('Cookie', global.signin())
      .send({})
      .expect(200);

    expect(body.users).toHaveLength(0);
    expect(body.team).toHaveLength(3);


  });

  it('retuens corresponding user and team matched with given keyword', async () => {
    const users = (await setup());
    await users[0].createTeams({ name: 'palteam1', description: '' });
    await users[0].createTeams({ name: 'palteam2', description: '' });
    await users[0].createTeams({ name: 'bobteam1', description: '' });

    const { body } = await request(app)
      .get(`/api/users/?keyword=${users[0].name}`)
      .set('Cookie', global.signin())
      .send({})
      .expect(200);


    expect(body.users).toHaveLength(3);
    expect(body.team).toHaveLength(2);
    expect(body.users[0].interests).toBeDefined();
  });


});