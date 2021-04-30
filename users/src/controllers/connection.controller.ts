import { BadRequestError, FriendStatus, InternalServerError, NotFoundError } from '@cuconnex/common';
import { Request, Response } from 'express';
import { IAcceptFriendRequest, IGetAllConnectionResponse, IGetAllFriendRequest } from '../interfaces';
import { User, Interest } from '../models'


/**
 * return all connections of the user (Connections where status is Accepted)
 * @param req 
 * @param res 
 */
export const getAllConnection = async (req: Request, res: Response): Promise<void> => {

  try {
    const connections = await req.user!.getAllConnectionWithStatus(FriendStatus.Accept);
  
    const response: IGetAllConnectionResponse = { connections: connections.map((ele) => ele.toJSON()) };
  
    res.status(200).send(response);
  }catch(err){
    throw new InternalServerError();
  }
};

/**
 * get all friend request handler (Relations whose status is still pending)
 */
export const getAllFriendRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await req.user!.getAllConnectionWithStatus(FriendStatus.Pending);
  
    const response: IGetAllFriendRequest = {
      requests: requests.map((ele) => ele.toJSON()),
    };
  
    res.status(200).send(response);    
  }catch(err){
    throw new InternalServerError();
  }
};


export const getAllReceivedFriendRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await req.user!.getReceivedFriendRequests();
  
    const response: IGetAllFriendRequest = {
      requests: requests.map(ele => ele.toJSON())
    }
  
    res.status(200).send(response)

  }catch(err){
    throw new InternalServerError();
  }
}


/**
 * Send friend request handler
 * @param req
 * @param res
 */
export const sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const addedUser = await User.fetchUser(req.body.userId);
  
  if(!addedUser){
    throw new NotFoundError('User');
  }


  await req.user!.requestConnection(addedUser);

  res.status(201).send({});
};

/**
 * Accepted or rejected friend request handler
 * @param req
 * @param res
 */
export const acceptFriendRequest = async (req: Request, res: Response): Promise<void> => {
  const sendUser = await User.fetchUser(req.body.userId);

  if (!sendUser) {
    throw new BadRequestError('Sender not found')
  }

  const status = await req.user!.acceptConnection(sendUser, req.body.accepted);

  const response: IAcceptFriendRequest = {
    status,
  }
  res.status(201).send(response);
}
