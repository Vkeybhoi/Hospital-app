"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctors = exports.signin = exports.signup = void 0;
const doctors_1 = require("../models/doctors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function signup(req, res) {
    console.log("calling signup");
    const result = utils_1.signupSchema.validate(req.body, utils_1.options);
    if (result.error) {
        return res.status(400).json({ message: result.error.message });
    }
    const { name, password, email, specialisation, gender, phoneNumber } = req.body;
    try {
        const existing = await doctors_1.doctors.findOne({ email });
        if (!existing) {
            const user = await doctors_1.doctors.create({
                password,
                name,
                email,
                specialisation,
                gender,
                phoneNumber
            });
            // Give the user a token
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
            });
            res.status(201).json({
                message: 'DOctor added successfully',
                data: {
                    user
                }
            });
            return;
        }
        res.status(400).json({ message: "user already exists" });
    }
    catch (err) {
        res.status(500).json({ message: "server error", error: err });
    }
}
exports.signup = signup;
async function signin(req, res) {
    try {
        console.log("calling signin");
        const result = utils_1.signinSchema.validate(req.body);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        const { email, password } = req.body;
        const user = await doctors_1.doctors.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'in valid login details' });
        }
        const matchPassword = await bcrypt_1.default.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Give the user a token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        // Save the token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        });
        res.status(200).json({
            message: 'User authenticated successfully.',
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
}
exports.signin = signin;
async function getAllDoctors(req, res) {
    console.log("calling getAllDoctors");
    const id = req.params.id;
    if (id === 'administrator') {
        try {
            const allDoctors = await doctors_1.doctors.find();
            if (allDoctors.length > 0) {
                res.json({
                    data: allDoctors
                });
            }
            else {
                res.json({ message: 'No Doctors found' });
            }
        }
        catch (err) {
            res.status(500).json({
                error: err
            });
        }
    }
    else {
        try {
            const thisDoctor = await doctors_1.doctors.findOne({ _id: id });
            if (thisDoctor) {
                return res.json({
                    data: thisDoctor
                });
            }
            res.status(404).json({
                message: 'doctor not found'
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: err
            });
        }
    }
}
exports.getAllDoctors = getAllDoctors;
