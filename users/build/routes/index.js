"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./team-routes/add-member"), exports);
__exportStar(require("./team-routes/get-member"), exports);
__exportStar(require("./team-routes/get-team"), exports);
__exportStar(require("./team-routes/new-team"), exports);
__exportStar(require("./user-routes/new-user"), exports);
__exportStar(require("./user-routes/get-user"), exports);
__exportStar(require("./user-routes/add-friend"), exports);
__exportStar(require("./user-routes/notification"), exports);
__exportStar(require("./user-routes/manageStatus"), exports);
__exportStar(require("./search"), exports);
__exportStar(require("./status"), exports);
