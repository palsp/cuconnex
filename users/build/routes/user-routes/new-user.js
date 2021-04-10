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
exports.newUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("@cuconnex/common");
const models_1 = require("../../models");
const middleware_1 = require("../../middlewares/middleware");
const common_2 = require("@cuconnex/common");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
exports.newUserRouter = router;
const bodyChecker = [
    express_validator_1.body('interests')
        .not()
        .isEmpty()
        .custom((input) => {
        // check for validity
        let valid = true;
        // check if key in interests filed is existed in InterestDescription
        for (let key in input) {
            valid = valid && (key in common_1.InterestDescription);
            if (input[key]) {
                valid = valid && Array.isArray(input[key]);
            }
        }
        // expect valid to be true so the process continue
        return valid;
    })
        .withMessage('Valid interest must be provided'),
    express_validator_1.body('name')
        .notEmpty()
        .withMessage('Name must be supplied')
];
// create user for first time login
router.post('/api/users', multer_config_1.upload.single('myFile'), middleware_1.transformRequest, bodyChecker, common_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { interests, name, faculty } = req.body;
    // console.log(interests, name)
    let imagePath = "";
    if (req.file) {
        imagePath = req.file.path;
    }
    // Make sure that user does not exist
    let user = yield models_1.User.findOne({ where: { id: req.currentUser.id } });
    if (user) {
        throw new common_2.BadRequestError('User already existed');
    }
    let createsuccess = false;
    // create users 
    try {
        user = yield models_1.User.create({ id: req.currentUser.id, name: name, faculty: faculty || "", image: imagePath });
        for (let category in interests) {
            console.log(category);
            // select only valid interest description 
            interests[category] = models_1.Interest.validateDescription(interests[category], Object.values(common_1.InterestDescription[category]));
            yield user.addInterestFromArray(interests[category]);
        }
        createsuccess = true;
    }
    catch (err) {
        createsuccess = false;
    }
    if (!createsuccess && user) {
        yield user.destroy();
        throw new common_2.BadRequestError('Create User Failed');
    }
    res.status(201).send({ id: user.id, interests, image: user.image });
}));
