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

reportSchema.virtual("doctors", {
    ref: "doctors",
    localField: "doctorId",
    foreignField: "id",
});

export const Report = mongoose.model<ReportAtrributes & Document>("Report", reportSchema);

// export class Report extends Model{}

// Report.init({
//     patientId: {
//         type: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     patientName: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false
//     },
//     age: {
//         type: DataTypes.STRING,
//         allowNull:false,
//     },
//     hospitalName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     weight: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     bloodGroup: {
//         type: DataTypes.STRING,
//         allowNull:false,
//     },
//     genotype: {
//         type: DataTypes.STRING,
//         allowNull:false,
//     },
//     bloodPressure: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     hiv_status: {
//         type: DataTypes.STRING,
//         allowNull:false,
//     },
//     hepatitis: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     height: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     doctorId: {
//         type: DataTypes.UUIDV4,
//         allowNull: false,
//     }


// },
// { 
//     sequelize: db,
//     modelName: "Report"
// }
// ); 
