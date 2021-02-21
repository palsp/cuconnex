import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user.model';

it('should return a corresponding user(s) for the given name', async () => {
    const id = "613188621";
    const user2Id = "6131797921";

    const user = await User.create({ id, name: 'pal' });



})



it('should return a corresponding user(s) for the given id', async () => { })