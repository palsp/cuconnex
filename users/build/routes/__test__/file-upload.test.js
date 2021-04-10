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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@cuconnex/common");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const file_1 = require("../../utils/file");
describe('The /api/upload', () => {
    it('should return 401 - Not Auhtorized if user is not signin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/users')
            .field({ interests: JSON.stringify({ Technology: [common_1.Technology.Coding] }), name: 'Anon' })
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
            .expect(401);
    }));
    it('should return 400 if the file uploaded is of the wrong type', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(app_1.app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg.zip')
            .expect(400)
            .then(response => {
            expect(response.body.errors[0].message).toEqual("Image uploaded is not of type jpg/jpeg or png");
        });
    }));
    it('should return 201 if there is a valid file uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield supertest_1.default(app_1.app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .field({
            name: 'Anon',
            interests: JSON.stringify({ Technology: [common_1.Technology.Coding] })
        })
            .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
            .expect(201);
        expect(body.image).not.toEqual("");
        file_1.deleteFile(body.image);
    }));
    it('should create user although file is not attached', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield supertest_1.default(app_1.app)
            .post('/api/users')
            .set('Cookie', global.signin())
            .send({
            name: 'Anon',
            interests: {}
        })
            .expect(201);
        expect(body.image).toEqual("");
    }));
    // describe('The /api/users endpoint with files', () => {
    //     it('should return 201 without interests', async () => {
    //         await request(app)
    //             .post('/api/users')
    //             .set('Cookie', global.signin())
    //             .field({
    //                 name: 'test' })
    //             .attach('myFile', 'src/routes/__test__/test_images/testImage.jpg')
    //             .then(res => {
    //               expect(res.body.errors).toEqual(null);
    //             });
    //     });
});
