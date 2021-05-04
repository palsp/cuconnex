import axios from 'axios';

/**
 * axios instance for fetching from user service endpoint
 */
export const axiosUserInstance = axios.create({
    baseURL: process.env.USER_SRV_ENDPOINT,
    timeout: 3000
})

/**
 * axios instance for fetching from event service endpoint
 */
export const axiosEventInstance = axios.create({
    baseURL: process.env.EVENT_SRV_ENDPOINT,
    timeout: 3000
})
