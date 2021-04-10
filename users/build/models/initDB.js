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
exports.startDB = void 0;
const common_1 = require("@cuconnex/common");
const category_model_1 = require("./category.model");
/**
 *  startInterest create interests for the first time
 */
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createCategory();
});
exports.startDB = startDB;
const createCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let category in common_1.InterestDescription) {
        // create entry for each category
        const cat = yield category_model_1.Category.create({ category });
        yield createInterest(cat, Object.values(common_1.InterestDescription[category]));
    }
});
const createInterest = (category, interests) => __awaiter(void 0, void 0, void 0, function* () {
    for (let interest of interests) {
        yield category.createInterestToCategory({
            description: interest
        });
    }
});
