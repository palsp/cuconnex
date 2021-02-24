import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';




it('should return 401 if user is not authenticated', async () => {
    await request(app)
        .get(`/api/users/adsfafasfasdfa`)
        .send({})
        .expect(401)
})



it('should return a corresponding user(s) for the given name sort by name length', async () => {

    const user1 = await User.create({ id: "6131886621", name: "pal" });
    const user2 = await User.create({ id: "6131776621", name: "bob" });
    const user3 = await User.create({ id: "6131776631", name: "palllllll" });
    const user4 = await User.create({ id: "6131e76631", name: "palalcc" });

    const { body: res } = await request(app)
        .get(`/api/users/${user1.name}`)
        .set('Cookie', global.signin(user2.id))
        .send({})

    expect(res).toHaveLength(3);
    const transformed = res.map((user: { id: string, name: string }) => user.name);
    expect(transformed[0]).toEqual(user1.name)
    expect(transformed[1]).toContain(user4.name)
    expect(transformed[2]).toContain(user3.name)


})



it('should return a corresponding user(s) for the given id', async () => {
    const user1 = await User.create({ id: "6131886621", name: "pal" });
    const user2 = await User.create({ id: "6131776621", name: "bob" });
    const user3 = await User.create({ id: "6131776631", name: "palllllll" });

    const { body: res } = await request(app)
        .get(`/api/users/${user1.id}`)
        .set('Cookie', global.signin(user2.id))
        .send({})

    expect(res).toHaveLength(1);
    expect(res[0].id).toEqual(user1.id);
    expect(res[0].name).toEqual(user1.name);

})


it('should return empty array if the input params does not match any attribute in db', async () => {
    const id = "6131767621";
    await User.create({ id, name: "test" });
    const { body: res } = await request(app)
        .get(`/api/users/adfasdfasdfafds`)
        .set('Cookie', global.signin(id))
        .send({})

    expect(res).not.toBeNull();
    expect(res).toHaveLength(0)
});


it.todo('should send data in specific pattern')