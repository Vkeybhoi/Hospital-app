"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const reportSchema = new mongoose_1.Schema({
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
    age: {
        type: Number,
        required: true,
    },
    hospitalName: {
        type: String,
        unique: true,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    genotype: {
        type: String,
        required: true,
    },
    bloodPressure: {
        type: String,
        required: true,
    },
    HIV_status: {
        type: String,
        required: true,
    },
    hepatitis: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
reportSchema.virtual("doctors", {
    ref: "doctors",
    localField: "doctorId",
    foreignField: "id",
});
exports.Report = mongoose_1.default.model("Report", reportSchema);
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
