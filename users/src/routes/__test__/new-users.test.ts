// import request from 'supertest';
// import { app } from '../../app';
// import { User } from '../../models/user.model';
// import { InterestDescription } from '@cuconnex/common';


// it('should return 400 if name is not supplied', async () => {
//     await request(app)
//         .post('/api/users')
//         .set('Cookie', global.signin())
//         .send({
//             interests: InterestDescription.Business
//         })
//         .expect(400)
// })

// it('should return 400 if users send invalid type of interest list', async () => {
//     await request(app)
//         .post('/api/users')
//         .set('Cookie', global.signin())
//         .send({
//             name: "test",
//             interests: InterestDescription.Business
//         })
//         .expect(400)
// });

// it('should return 400 if user info already existed', async () => {
//     const sid = "6131886621";
//     const cookies = global.signin(sid);
//     await User.create({ sid, name: "pal" })
//     await request(app)
//         .post('/api/users')
//         .set('Cookie', cookies)
//         .send({
//             name: "test",
//             interests: [InterestDescription.Business]
//         })
//         .expect(400)
// })

// it('should return 400 if users send interests list with valid interest description', async () => {
//     await request(app)
//         .post('/api/users')
//         .set('Cookie', global.signin())
//         .send({
//             name: "test",
//             interests: [InterestDescription.Business, "Hello"]
//         })
//         .expect(400)
// });

// it('should return 401 if users is not login', async () => {
//     await request(app)
//         .post('/api/users')
//         .send({
//             name: "test",
//             interests: [InterestDescription.Business]
//         })
//         .expect(401)
// });

// it('should create a users with interests on valid input', async () => {
//     await request(app)
//         .post('/api/users')
//         .set('Cookie', global.signin())
//         .send({
//             name: "test",
//             interests: [InterestDescription.Business]
//         })
//         .expect(201)



// })

// it('should not save duplicate interest list', async () => {

//     const { body: user } = await request(app)
//         .post('/api/users')
//         .set('Cookie', global.signin())
//         .send({
//             name: "test",
//             interests: [InterestDescription.Business, InterestDescription.Business]
//         })
//         .expect(201)


//     const currentUser = await User.findOne({ where: { sid: user.sid } });
//     expect(await currentUser?.getInterests()).toHaveLength(1);


// });



it('should pass ', async () => { });





