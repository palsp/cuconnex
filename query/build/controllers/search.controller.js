"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHandler = void 0;
const axiosInstance_1 = require("../api/axiosInstance");
require('express-async-errors');
// Demo Cookie
const cookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TXpFeE1qRXhNakVpTENKcFlYUWlPakUyTVRnMU1UZzBOemw5LkJTOUlwcTB4WDYyU0lPbmpwT0l5X3hpbnVWRkxIQmk0ODh1X2Y5LUo4SHMifQ==';
/**
 * Forward the to user and team services, mearge two response back to single response before send back to user
 * @param req
 * @param res
 */
const searchHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userResp;
    try {
        // TODO: demo cookie is provided for development purpose only, it should be removed in production stage
        // fetch data from user service
        userResp = yield axiosInstance_1.axiosUserInstance.get(`/api/users/general/${req.params.keyword}`, { headers: { cookie: req.headers.cookie || cookie } });
    }
    catch (err) {
        console.error('User Failed', err);
    }
    let eventResp;
    try {
        // TODO: demo cookie is provided for development purpose only, it should be removed in production stage
        // fetch data from event service
        eventResp = yield axiosInstance_1.axiosEventInstance.get(`/api/events/${req.params.keyword}`, { headers: { cookie: req.headers.cookie || cookie } });
    }
    catch (err) {
        console.error('Event Failed', err);
    }
    // if fetch from any service failed, it should be replace with default response
    const userResult = userResp ? userResp.data : { users: [], team: [] };
    const eventResult = eventResp ? eventResp.data : { events: [] };
    res.status(200).send(Object.assign(Object.assign({}, userResult), eventResult));
});
exports.searchHandler = searchHandler;