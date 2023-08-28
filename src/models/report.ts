import connectDB from "../config/config"
import mongoose, { Document, Schema, Model } from "mongoose";
import { doctors } from "./doctors";


interface ReportAtrributes{
  patientId: string;
  patientName: string;
  age: number;
  hospitalName:string;
  weight:string;
  height:string;
  bloodGroup:string;
  genotype:string;
  bloodPressure:string;
  HIV_status:string;
  hepatitis:string;
  doctorId: string;
}

const reportSchema = new Schema({
    patientId: {
        type: String,
        unique: true,
        required: true,
    },
    patientName: {
        type: String,
        unique: true,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    hospitalName: {
        type: String,
        unique: true,
        required: true,
    },
    weight:{
        type: String,
        required: true,
    },

    height:{
        type: String,
        required: true,
    },
    bloodGroup:{
        type: String,
        required: true,
    },
    genotype:{
        type: String,
        required: true,
    },
    bloodPressure:{
        type: String,
        required: true,
    },
    HIV_status:{
        type: String,
        required: true,
    },
    hepatitis:{
        type: String,
        required: true,
    },
    doctorId:{
        type: String,
        required: true,
    },
} , {timestamps: true});

export const Report = mongoose.model<ReportAtrributes & Document>("Report", reportSchema);