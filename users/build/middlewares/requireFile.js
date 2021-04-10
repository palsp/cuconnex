"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireFile = void 0;
const common_1 = require("@cuconnex/common");
const requireFile = (req, res, next) => {
    if (!req.file) {
        throw new common_1.BadRequestError('Please include a file!!');
    }
    next();
};
exports.requireFile = requireFile;
