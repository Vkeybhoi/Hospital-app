"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doctors_1 = require("../models/doctors");
const token = process.env.JWT_SECRET;
async function Auth(req, res, next) {
    console.log('calling auth');
    try {
        const jwtToken = req.cookies.token; // Get JWT from cookies
        if (!jwtToken) {
            return res.status(403).json({ error: "Kindly sign in as a user" });
        }
        let verified = jsonwebtoken_1.default.verify(jwtToken, token);
        if (!verified) {
            return res
                .status(401)
                .json({ error: "Token invalid, you can't access this route" });
        }
        const { id } = verified;
        const user = await doctors_1.doctors.findOne({ _id: id });
        if (!user) {
            return res.status(401).json({ error: "Kindly sign in as a user" });
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "User not logged in" });
    }
}
exports.Auth = Auth;
