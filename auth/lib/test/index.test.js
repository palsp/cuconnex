"use strict";
var request = require("supertest");
var app = require("../routes/app");
describe('The root path test: ', function () {
    it('should response the GET method with Hello world', function () {
        return request(app)
            .get("/api")
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual('text/html; charset=utf-8');
            expect(response.text).toEqual("Hello World");
        });
    });
});
