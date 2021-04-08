import { initializeDB, endDB } from '../db';
import { Sequelize } from 'sequelize';
import { Connection } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import { startDB } from '../models/initDB'
import { TableName } from '../models/types';

jest.mock('../db');

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

interface db {
  connection?: Connection;
  sequelize?: Sequelize;
}

let testDB: db;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdfaf';
  // create db if doesn't already existed
  try {
    testDB = await initializeDB();


    await startDB();

  } catch (err) {
    throw new Error('Initialized databae failed');
  }
});

beforeEach(async () => {
  const models = Object.values(testDB.sequelize!.models);
  for (let model of models) {
    if (model.tableName != TableName.interests && model.tableName != TableName.category) {
      await model.destroy({ where: {} });
    }
  }
});

afterAll(async () => {
  await endDB(testDB);
});

global.signin = (id?: string) => {
  // Build JWT payload { id , username }
  const payload = {
    id: id || '6131707021',
    username: 'birdgloveeiei'
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session
  const session = { jwt: token };

  // Turn into json
  const sessionJSON = JSON.stringify(session);

  // Take JSON and turn into string base64( cookie )
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
};
