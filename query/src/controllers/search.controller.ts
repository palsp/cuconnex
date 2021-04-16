import { Request, Response } from 'express';
import { axiosEventInstance, axiosUserInstance } from '../api/axiosInstance';

require('express-async-errors');

const cookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TXpFeE1qRXhNakVpTENKcFlYUWlPakUyTVRnMU1UZzBOemw5LkJTOUlwcTB4WDYyU0lPbmpwT0l5X3hpbnVWRkxIQmk0ODh1X2Y5LUo4SHMifQ=='

export const searchHandler = async (req: Request, res: Response) => {

    let userResp;
    try {
        userResp = await axiosUserInstance.get(`/api/users/general/${req.params.keyword}`, { headers: { cookie: req.headers.cookie } })

    } catch (err) {
        // console.log('User Failed', err)
    }

    let eventResp;
    try {

        eventResp = await axiosEventInstance.get(`/api/events/${req.params.keyword}`, { headers: { cookie: req.headers.cookie } })
    } catch (err) {
        // console.log('Event Failed', err)
    }

    const userResult = userResp ? userResp.data : { users: [], team: [] };
    const eventResult = eventResp ? eventResp.data : { events: [] };
    res.status(200).send({ ...userResult, ...eventResult });
}