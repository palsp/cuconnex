const request = require("supertest");
const app = require("../routes/app");

describe('The root path test: ', () => {
    it('should response the GET method with Hello world', () => {
        return request(app)
            .get("/")
            .then((response) => {
                expect(response.statusCode).toBe(200);
                
                expect(response.headers['content-type']).toEqual('text/html; charset=utf-8');
                expect(response.text).toEqual("Hello World")
                
            });
    })
})