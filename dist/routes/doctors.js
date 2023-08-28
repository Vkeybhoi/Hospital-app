"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_1 = require("../controllers/doctors");
const auth_1 = require("../middlewear/auth");
const router = express_1.default.Router();
/* GET users listing. */
router.post('/signup', doctors_1.signup);
router.post('/signin', doctors_1.signin);
router.get('/ver/:id', auth_1.Auth, doctors_1.getAllDoctors);
exports.default = router;
