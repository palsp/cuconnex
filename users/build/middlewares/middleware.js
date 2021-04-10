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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRequest = void 0;
/**
 * Transform multipartvalue into normal json format
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const transformRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.interests && typeof req.body.interests === 'string') {
        req.body.interests = JSON.parse(req.body.interests);
    }
    next();
});
exports.transformRequest = transformRequest;
