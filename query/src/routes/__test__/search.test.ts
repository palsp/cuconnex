import { stub } from 'sinon';
import { app } from '../../app';
import request from 'supertest';
import { axiosEventInstance, axiosUserInstance } from '../../api/axiosInstance';




beforeEach(() => {
    stub(axiosUserInstance, 'get')
    stub(axiosEventInstance, 'get')
});

afterEach(() => {
    // @ts-ignore
    axiosEventInstance.get.restore();
    // @ts-ignore
    axiosUserInstance.get.restore();
});

it('should include all field in response if user services is not available', async () => {
    // @ts-ignore
    axiosUserInstance.get.throws();
    // @ts-ignore
    axiosEventInstance.get.returns({ data: { events: [{ "event-name": "test event" }] } })



    const { body } = await request(app)
        .get("/api/query/:api")
        .send({})



    expect(body.users).toBeDefined();
    expect(body.team).toBeDefined();
    expect(body.events).toHaveLength(1)

});


it('should include all response if event service is not available', async () => {
    // @ts-ignore
    axiosUserInstance.get.returns({ data: { users: [{ id: "user_id" }], team: [{ id: "team_id" }] } });
    // @ts-ignore
    axiosEventInstance.get.throws();

    const { body } = await request(app)
        .get("/api/query/:api")
        .send({})


    expect(body.users).toHaveLength(1)
    expect(body.team).toHaveLength(1)
    expect(body.events).toHaveLength(0)


});


it('should include all if both service is  not available', async () => {
    // @ts-ignore
    axiosUserInstance.get.throws();
    // @ts-ignore
    axiosEventInstance.get.throws();


    const { body } = await request(app)
        .get("/api/query/:api")
        .send({})

    expect(body.users).toHaveLength(0)
    expect(body.events).toHaveLength(0)
    expect(body.team).toHaveLength(0)

});

it('should include all if both service is available', async () => {
    // @ts-ignore
    axiosUserInstance.get.returns({ data: { users: [{ id: "user_id" }], team: [{ id: "team_id" }] } });
    // @ts-ignore
    axiosEventInstance.get.returns({ data: { events: [{ "event-name": "test event" }] } })

    const { body } = await request(app)
        .get("/api/query/:api")
        .send({})

    expect(body.users).toHaveLength(1)
    expect(body.events).toHaveLength(1)
    expect(body.team).toHaveLength(1)

});

it.todo('should terminate send the response within the time limit')