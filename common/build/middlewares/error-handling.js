"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
var custom_error_1 = require("../errors/custom-error");
var errorHandling = function (err, req, res, next) {
    // if error is an instacne of Custom error
    // we return an error message with fix format
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    // allow developer to debug error
    console.error(err);
    res.status(400).send({
        errors: [{ message: 'Something Went Wrong' }]
    });
};
exports.errorHandling = errorHandling;
