"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.options = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    // confirm_password:Joi.any().equal(Joi.ref("password")).required,
    gender: joi_1.default.string().required(),
    specialisation: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
});
exports.options = {
    AbortController: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
exports.signinSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{4,12}$/).required(),
});
