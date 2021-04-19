"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const start = () => {
    // if (!process.env.USER_SRV_ENDPOINT) {
    //     throw new Error('USER_SRV_ENDPOINT must be defined')
    // }
    // if (!process.env.EVENT_SRV_ENDPOINT) {
    //     throw new Error('EVENT_SRV_ENDPOINT must be defined')
    // }
    app_1.app.listen(3000, () => {
        console.log('Listening on port 3000 .......');
    });
};
start();
