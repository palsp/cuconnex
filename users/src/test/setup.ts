import { sequelize, initializeDB } from '../db';
import { User } from '../models/user.model';
import { Interest } from '../models/interest.model';
import jwt from 'jsonwebtoken';



jest.mock('../db');


declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[];
        }
    }
}

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdfaf';
    // create db if doesn't already existed
    await initializeDB();

    // User.hasMany(Interest, { sourceKey: "id", foreignKey: "userId", as: "interests", onDelete: 'CASCADE' });
    //await sequelize.sync();
});

beforeEach(async () => {
    const models = Object.values(sequelize.models)
    for (let model of models) {
        await model.destroy({ where: {} })
    }
});

afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
})



global.signin = (id?: string) => {
    // Build JWT payload { id , username }
    const payload = {
        id: id || "6131707021",
        username: "birdgloveeiei",
    }

    // create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build session 
    const session = { jwt: token }

    // Turn into json
    const sessionJSON = JSON.stringify(session);

    // Take JSON and turn into string base64( cookie )
    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];

}