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
const sinon_1 = require("sinon");
const app_1 = require("../../app");
const supertest_1 = __importDefault(require("supertest"));
const axiosInstance_1 = require("../../api/axiosInstance");
beforeEach(() => {
    sinon_1.stub(axiosInstance_1.axiosUserInstance, 'get');
    sinon_1.stub(axiosInstance_1.axiosEventInstance, 'get');
});
afterEach(() => {
    // @ts-ignore
    axiosInstance_1.axiosEventInstance.get.restore();
    // @ts-ignore
    axiosInstance_1.axiosUserInstance.get.restore();
});
it('should include all field in response if user services is not available', () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    axiosInstance_1.axiosUserInstance.get.throws();
    // @ts-ignore
    axiosInstance_1.axiosEventInstance.get.returns({ data: { events: [{ "event-name": "test event" }] } });
    const { body } = yield supertest_1.default(app_1.app)
        .get("/api/query/:api")
        .send({});
    expect(body.users).toBeDefined();
    expect(body.team).toBeDefined();
    expect(body.events).toHaveLength(1);
}));
it('should include all response if event service is not available', () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    axiosInstance_1.axiosUserInstance.get.returns({ data: { users: [{ id: "user_id" }], team: [{ id: "team_id" }] } });
    // @ts-ignore
    axiosInstance_1.axiosEventInstance.get.throws();
    const { body } = yield supertest_1.default(app_1.app)
        .get("/api/query/:api")
        .send({});
    expect(body.users).toHaveLength(1);
    expect(body.team).toHaveLength(1);
    expect(body.events).toHaveLength(0);
}));
it('should include all if both service is  not available', () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    axiosInstance_1.axiosUserInstance.get.throws();
    // @ts-ignore
    axiosInstance_1.axiosEventInstance.get.throws();
    const { body } = yield supertest_1.default(app_1.app)
        .get("/api/query/:api")
        .send({});
    expect(body.users).toHaveLength(0);
    expect(body.events).toHaveLength(0);
    expect(body.team).toHaveLength(0);
}));
it('should include all if both service is available', () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    axiosInstance_1.axiosUserInstance.get.returns({ data: { users: [{ id: "user_id" }], team: [{ id: "team_id" }] } });
    // @ts-ignore
    axiosInstance_1.axiosEventInstance.get.returns({ data: { events: [{ "event-name": "test event" }] } });
    const { body } = yield supertest_1.default(app_1.app)
        .get("/api/query/:api")
        .send({});
    expect(body.users).toHaveLength(1);
    expect(body.events).toHaveLength(1);
    expect(body.team).toHaveLength(1);
}));
it.todo('should terminate send the response within the time limit');
