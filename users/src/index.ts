import { FriendStatus, TeamStatus } from '@cuconnex/common';
import { app } from './app';
import { initializeDB } from './db';
import { User } from './models/user.model';
import { Member } from './models/member.model';
import { Friend } from './models/friend.model';
import { TableName } from './models/types';

const validateEnvAttr = () => {
  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST must be defined');
  }

  if (!process.env.DB_USER) {
    throw new Error('DB_USER must be defined');
  }

  if (!process.env.DB_USER) {
    throw new Error('DB_USER must be defined');
  }

  if (!process.env.DB_SCHEMA) {
    throw new Error('DB_SCHEMA must be defined');
  }

  if (!process.env.DB_SCHEMA) {
    throw new Error('DB_SCHEMA must be defined');
  }

  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD must be defined');
  }
};

const start = async () => {
  try {
    // check if all required env variable have been declared
    // validateEnvAttr();
    await initializeDB();

    const user = await User.create({ id: '6131707021', name: 'Krittamook' });
    user.createTeams({ name: 'dummy' });
    const team = await user.createTeams({ name: 'TeamDum' });
    await Member.create({ userId: user.id, teamName: 'TeamDum', status: TeamStatus.Accept });
    // console.log('create dummy user ', user);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000..');
  });
};

start();
