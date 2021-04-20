import { Request, Response } from 'express';
import { axiosEventInstance, axiosUserInstance } from '../api/axiosInstance';

require('express-async-errors');

// Demo Cookie
const cookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TXpFeE1qRXhNakVpTENKcFlYUWlPakUyTVRnMU1UZzBOemw5LkJTOUlwcTB4WDYyU0lPbmpwT0l5X3hpbnVWRkxIQmk0ODh1X2Y5LUo4SHMifQ=='

/**
 * Forward the to user and team services, mearge two response back to single response before send back to user
 * @param req 
 * @param res 
 */
export const searchHandler = async (req: Request, res: Response) => {


    let userResp;
    try {
        // TODO: demo cookie is provided for development purpose only, it should be removed in production stage
        // fetch data from user service
        userResp = await axiosUserInstance.get(`/api/users/?keyword=${req.params.keyword}`, { headers: { cookie: req.headers.cookie || cookie } })

    } catch (err) {
        console.error('User Failed', err)
    }

    let eventResp;
    try {
        // TODO: demo cookie is provided for development purpose only, it should be removed in production stage
        // fetch data from event service
        eventResp = await axiosEventInstance.get(`/api/events/${req.params.keyword}`, { headers: { cookie: req.headers.cookie || cookie } })
    } catch (err) {
        console.error('Event Failed', err)
    }

    // if fetch from any service failed, it should be replace with default response
    const userResult = userResp ? userResp.data : { users: [], team: [] };
    const eventResult = eventResp ? eventResp.data : { events: [] };
    res.status(200).send({ ...userResult, ...eventResult });
}