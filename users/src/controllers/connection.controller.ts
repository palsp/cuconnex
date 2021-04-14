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
        const userSerielizer = await conn.serializer()
        resp.push(userSerielizer);
    }
    res.status(200).send({ connections: resp })
}