import { initializeDB, endDB } from '../db';
import { Sequelize } from 'sequelize'
import { Connection } from 'mysql2/promise';
import request from 'supertest';
import { app } from '../routes/app';



jest.mock('../db');


declare global {
    namespace NodeJS {
        interface Global {
            signup(id?: string): Promise<string[]>;
        }
    }
}

interface db {
    connection?: Connection,
    sequelize?: Sequelize,
}

let testDB: db;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdfaf';
    // create db if doesn't already existed
    try {
        testDB = await initializeDB();
    } catch (err) {
        throw new Error('Initialized databae failed');
    }
});

beforeEach(async () => {
    const models = Object.values(testDB.sequelize!.models)
    for (let model of models) {
        await model.destroy({ where: {} })
    }
});

afterAll(async () => {
    await endDB(testDB);
})


global.signup = async (id?: string) => {


    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            id: id || "6131776621",
            email,
            password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie');
    return cookie;

};