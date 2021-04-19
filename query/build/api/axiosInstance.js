"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosEventInstance = exports.axiosUserInstance = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * axios instance for fetching from user service endpoint
 */
exports.axiosUserInstance = axios_1.default.create({
    baseURL: process.env.USER_SRV_ENDPOINT,
    timeout: 3000
});
/**
 * axios instance for fetching from event service endpoint
 */
exports.axiosEventInstance = axios_1.default.create({
    baseURL: process.env.USER_SRV_ENDPOINT,
    timeout: 3000
});
