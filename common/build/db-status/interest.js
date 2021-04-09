"use strict";
// export enum InterestDescription {
//     Developer = "Developer",
//     Startup = "Startup",
//     Business = "Business",
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestDescription = exports.Design = exports.Business = exports.Technology = void 0;
/**
 * Technology interest Description
 */
var Technology;
(function (Technology) {
    Technology["Coding"] = "Coding";
    Technology["WebBuilder"] = "Web Builder";
    Technology["ChatBot"] = "ChatBot";
    Technology["FinTech"] = "FinTech";
})(Technology = exports.Technology || (exports.Technology = {}));
/**
 * Business interest Description
 */
var Business;
(function (Business) {
    Business["Marketing"] = "Marketing";
    Business["BusinessCase"] = "Business Case";
    Business["Startup"] = "Startup";
    Business["Ecommerce"] = "Ecommerce";
})(Business = exports.Business || (exports.Business = {}));
/**
 * Design interest description
 */
var Design;
(function (Design) {
    Design["Graphic"] = "Graphic";
    Design["UXUI"] = "UXUI";
    Design["Ads"] = "Ads";
    Design["Fashion"] = "Fashion";
})(Design = exports.Design || (exports.Design = {}));
/**
 * Description for interest database
 */
exports.InterestDescription = {
    "Business": Business,
    "Technology": Technology,
    "Design": Design,
};
