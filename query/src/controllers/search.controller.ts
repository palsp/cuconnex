import { Request, Response } from 'express';
import axios from 'axios';


export const searchHandler = async (req: Request, res: Response) => {
    console.log(req.headers)

    // Demo: Forward alll headers to user the end-point
    axios.get("user_service_url", {
        headers: req.headers
    })

    //Demo: Forward all headers to the event end point
    axios.get("event_service_url", {
        headers: req.headers
    })
    return res.status(200).send({});
}