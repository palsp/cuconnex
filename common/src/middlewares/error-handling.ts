import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error';




export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {

    // if error is an instacne of Custom error
    // we return an error message with fix format
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    // allow developer to debug error
    console.error(err)

    res.status(400).send({
        errors: [{ message: 'Something Went Wrong' }]
    })
}