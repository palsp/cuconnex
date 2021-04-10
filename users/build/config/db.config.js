"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_config = void 0;
exports.default = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_SCHEMA,
};
/*TODO: chnage this back to default settings after development*/
exports.test_config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    db: 'testdb',
};
