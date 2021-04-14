import { FriendStatus } from '@cuconnex/common';
import { Request, Response, NextFunction } from 'express';


/**
 * return all connections of the user
 * @param req 
 * @param res 
 */
export const getAllConnection = async (req: Request, res: Response) => {
    const connections = await req.user!.getConnection()
    const resp = []
    for (let conn of connections) {
        const status = await req.user!.findRelation(conn.id);
        // skip if there is not establish connection
        if (status !== FriendStatus.Accept) {
            continue;
        }
        const userSerielizer = await conn.serializer()
        resp.push(userSerielizer);
    }
    res.status(200).send({ connections: resp })
}

/**
 * get all friend request 
 */
export const getAllFriendRequest = async (req: Request, res: Response) => {
    const requests = await req.user!.getRequestConnection();
    const resp = [];
    for (let request of requests) {
        const userSerielizer = await request.serializer()
        resp.push(userSerielizer);
    }
    res.status(200).send({ requests: resp })
}