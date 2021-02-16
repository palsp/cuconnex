"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../routes/app");
const request = require("supertest");
describe('The root path test: ', () => {
    it('should response the GET method with Hello world', () => {
        return request(app_1.app)
            .get("/api")
            .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual('text/html; charset=utf-8');
            expect(response.text).toEqual("Hello World");
        });
    });
});
