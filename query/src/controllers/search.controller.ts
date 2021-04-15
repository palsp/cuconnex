import { Request, Response } from 'express';
import axios from 'axios';

const cookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TXpFeE1qRXhNakVpTENKcFlYUWlPakUyTVRnMU1UZzBOemw5LkJTOUlwcTB4WDYyU0lPbmpwT0l5X3hpbnVWRkxIQmk0ODh1X2Y5LUo4SHMifQ=='

export const searchHandler = async (req: Request, res: Response) => {

    // TODO: Change to environment variable
    const url = process.env.USER_SRV_ENDPOINT || 'http://188.166.197.13'

    let userResp;
    let eventResp;
    try {
        userResp = await axios.get(url + `/api/users/general/${req.params.keyword}`, {
            headers: {
                cookie: cookie
            }
        })

        eventResp = await axios.get(url + `/api/events/`, {
            headers: {
                cookie: cookie
            }
        })
        console.log(eventResp.data)
    } catch (err) {
        console.log('Error', err)
    }

    const userResult = userResp ? userResp.data : null;
    const eventResult = eventResp ? eventResp.data : null;
    res.status(200).send({ ...userResult, ...eventResult });
}