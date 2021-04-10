"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const cookie_session_1 = __importDefault(require("cookie-session"));
const body_parser_1 = require("body-parser");
const common_1 = require("@cuconnex/common");
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares");
const router = __importStar(require("./routes"));
require('./config/multer.config');
const app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.set('trust proxy', true);
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
// app.use(cors());
app.use(cookie_session_1.default({
    signed: false,
    secure: false,
    // httpOnly : true,
}));
/*TODO: uncomment these three lines after development */
app.use(common_1.currentUser);
app.use(common_1.requireAuth);
app.use(middlewares_1.fetchUser);
app.use('/api/users/assets', express_1.default.static('assets'));
// user handler
app.use(router.getUserRouter);
app.use(router.newUserRouter);
app.use(router.addFriendRouter);
app.use(router.notificationUserRouter);
app.use(router.manageStatusRouter);
// team handler
app.use(router.getTeamRouter);
app.use(router.newTeamRouter);
app.use(router.getMemberRouter);
app.use(router.addMemberRouter);
// other handler
app.use(router.memberStatusRouter);
app.use(router.searchRouter);
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError();
}));
app.use(common_1.errorHandling);
