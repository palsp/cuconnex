import { CustomError } from "./custom-error";

export class InternalServerError extends CustomError {
    statusCode = 500;
    reason = 'Internal Server Error - Please try Again later'

    constructor() {
        super('Internal Server Error')

        Object.setPrototypeOf(this, InternalServerError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}