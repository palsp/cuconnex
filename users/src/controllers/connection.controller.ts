import { FriendStatus } from '@cuconnex/common';
import { Request, Response } from 'express';
import { User } from '../models'


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
 * get all friend request handler
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


/**
 * Send friend request handler
 * @param req 
 * @param res 
 */
export const sendFriendRequest = async (req: Request, res: Response) => {
    const addedUser = await User.findUser(req.body.userId);

    await req.user!.requestConnection(addedUser);

    res.status(201).send({});
}


/**
 * Accepted or rejected friend request handler
 * @param req 
 * @param res 
 */
export const acceptFriendRequest = async (req: Request, res: Response) => {
    const sendUser = await User.findUser(req.body.userId);

    const status = await req.user!.acceptConnection(sendUser.id, req.body.accepted);

    res.status(201).send({ status });
}