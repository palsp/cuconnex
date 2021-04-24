import { FriendStatus } from '@cuconnex/common';
import { Request, Response } from 'express';
import {
  IAcceptFriendRequest,
  IGetAllConnectionResponse,
  IGetAllFreindRequest,
} from '../interfaces';
import { User } from '../models';

/**
 * return all connections of the user
 * @param req
 * @param res
 */
export const getAllConnection = async (req: Request, res: Response): Promise<void> => {
  const connections = await req.user!.getConnection();
  const helper = [];

  for (let conn of connections) {
    const status = await req.user!.findRelation(conn.id);
    // skip if there is not establish connection
    if (status !== FriendStatus.Accept) {
      continue;
    }
    // const userSerielizer = await conn.serializer()
    conn.interests = await conn.getInterests();
    helper.push(conn);
  }

  const response: IGetAllConnectionResponse = { connections: helper.map((ele) => ele.toJSON()) };

  res.status(200).send(response);
};

/**
 * get all friend request handler
 */
export const getAllFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const requests = await req.user!.getRequestConnection();
  const helper = [];
  for (let request of requests) {
    request.interests = await request.getInterests();
    helper.push(request);
  }

  const response: IGetAllFreindRequest = {
    requests: helper.map((ele) => ele.toJSON()),
  };

  res.status(200).send(response);
};

/**
 * Send friend request handler
 * @param req
 * @param res
 */
export const sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const addedUser = await User.findUser(req.body.userId);

  await req.user!.requestConnection(addedUser);

  res.status(201).send({});
};

/**
 * Accepted or rejected friend request handler
 * @param req
 * @param res
 */
export const acceptFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const sendUser = await User.findUser(req.body.userId);

  const status = await req.user!.acceptConnection(sendUser.id, req.body.accepted);

  const response: IAcceptFriendRequest = {
    status,
  };
  res.status(201).send(response);
};
