import connectDB from "../config/config"
import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { Report } from "./report";

interface DoctorsAtrributes extends Document{
    password: string,
    name:string;
    email: string;
    specialisation: string;
    gender: string;
    phoneNumber: string;
    reports: Report[];
};

const doctorsSchema = new Schema({
    password: {
        type: String,
        unique: true,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    specialisation:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    reports: [{
        type: Schema.Types.ObjectId,
        ref: "Report",

    }]
} , {timestamps: true});

doctorsSchema.pre('save', async function (next) {
    const doctor = this;

    if (!doctor.isModified('password')) {
        return next();
    }

    try {
        const hash = await bcrypt.hash(doctor.password, 8);
        doctor.password = hash;
        next();
    } catch (error: any) { // Explicitly specify the error type
        return next(error);
    }
});

export const doctors = mongoose.model("doctors", doctorsSchema);
 