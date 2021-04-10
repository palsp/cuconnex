"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestEnumVal = exports.TableName = void 0;
const common_1 = require("@cuconnex/common");
var TableName;
(function (TableName) {
    TableName["users"] = "users";
    TableName["interests"] = "interests";
    TableName["connections"] = "connections";
    TableName["members"] = "members";
    TableName["userInterest"] = "userInterests";
    TableName["category"] = "categories";
    TableName["teams"] = "teams";
})(TableName = exports.TableName || (exports.TableName = {}));
/**
 * used for enum values of interest description filed
 */
let desc = [];
exports.InterestEnumVal = desc;
for (let key in common_1.InterestDescription) {
    const interest = Object.values(common_1.InterestDescription[key]);
    exports.InterestEnumVal = desc = desc.concat(interest);
}
