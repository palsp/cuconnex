import request from 'supertest';
import { app } from '../../app';
import { axiosEventInstance, axiosUserInstance } from '../../api/axiosInstance';




it('should include all field in response if user services is not available', async () => {


    const { body } = await request(app)
        .get("/api/query/:api")
        .send({})

    console.log(user)

});


it('should include all response if event service is not available', () => {

});


it('should include all if both service is  not available', () => {

});

it('should include all if both service is available', () => {

});

it('should terminate send the response within the time limit', () => {

});