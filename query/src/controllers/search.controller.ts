import { Request, Response } from 'express';
import axios from 'axios';


export const searchHandler = async (req: Request, res: Response) => {
    console.log(req.headers)

    // // Demo: Forward alll headers to user the end-point
    // const body = await axios.get(process.env.EVENT_SRV_ENDPOINT! + `/api/users/general/${req.params.keyword}`, {
    //     headers: {
    //         Cookie: [`express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TXpFeE1qRXhNakVpTENKcFlYUWlPakUyTVRnMU1UZzBOemw5LkJTOUlwcTB4WDYyU0lPbmpwT0l5X3hpbnVWRkxIQmk0ODh1X2Y5LUo4SHMifQ%3D%3D`]
    //     }
    // })
    try {
        const body = await axios.get("188.166.197.13/" + `/api/users/general/${req.params.keyword}`, {
            headers: {
                Cookies: [`express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TXpFeE1qRXhNakVpTENKcFlYUWlPakUyTVRnMU1UZzBOemw5LkJTOUlwcTB4WDYyU0lPbmpwT0l5X3hpbnVWRkxIQmk0ODh1X2Y5LUo4SHMifQ%3D%3D`]
            }
        })
        console.log(body)
    } catch (err) {
        console.log(err)
    }

    // console.log("user ", body);


    // //Demo: Forward all headers to the event end point
    // const resp = await axios.get(process.env.USER_SRV_ENDPOINT! + "/api/events/", {
    //     headers: req.headers
    // })

    // console.log("event ", resp)
    res.status(200).send({});
}