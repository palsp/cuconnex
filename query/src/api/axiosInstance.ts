import axios from 'axios';



export const axiosUserInstance = axios.create({
    baseURL: process.env.USER_SRV_ENDPOINT || "http://188.166.197.13",
    timeout: 3000
})

export const axiosEventInstance = axios.create({
    baseURL: process.env.USER_SRV_ENDPOINT || "http://188.166.197.13",
    timeout: 3000
})
