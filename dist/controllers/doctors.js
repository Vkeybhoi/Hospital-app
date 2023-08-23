"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReport = exports.deleteReport = exports.getAllReports = exports.createReport = exports.getAllDoctors = exports.signin = exports.signup = void 0;
const uuid_1 = require("uuid");
const doctors_1 = require("../models/doctors");
const report_1 = require("../models/report");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function signup(req, res) {
    console.log("calling singup");
    const { name, password, email, specialisation, gender, phoneNumber } = req.body;
    const user = await doctors_1.doctors.create({
        password,
        name,
        email,
        specialisation,
        gender,
        phoneNumber
    });
    res.status(201).json({
        message: 'DOctor added successfully',
        data: {
            user
        }
    });
}
exports.signup = signup;
async function signin(req, res) {
    console.log("calling signin");
    const { email, password } = req.body;
    try {
        const user2 = await doctors_1.doctors.findOne({ email: email });
        if (!user2) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const matchPassword = await bcrypt_1.default.compare(password, user2.password);
        if (!matchPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const id = user2._id;
        res.redirect(`/users/ver/${id}`);
        res.status(200).json({
            message: 'User authenticated successfully.',
            data: {
                user2,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}
exports.signin = signin;
async function getAllDoctors(req, res) {
    console.log("calling getAllDoctors");
    const id = req.params.id;
    if (id === 'administrator') {
        try {
            const allDoctors = await doctors_1.doctors.find();
            // { 
            //     attributes: ["id", "name", "email", "specialisation", "gender", "phoneNumber"],
            //     include: [{
            //         model: Report,
            //         as: 'reports',
            //     }]
            // },
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
            const thisDoctor = await doctors_1.doctors.findOne({ id: id });
            // attributes: ["id", "name", "email", "specialisation", "gender", "phoneNumber"],
            // include: [{
            //     model: Report,
            //     as: 'reports',
            // }]
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
async function createReport(req, res) {
    console.log("calling createReport");
    const doctorId = req.params.id;
    const { patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, hiv_status, hepatitis } = req.body;
    const newid = (0, uuid_1.v4)();
    const doct = await doctors_1.doctors.findOne({ where: { id: doctorId } });
    if (!doct) {
        return res.status(404).json({ message: 'Doctor not found.' });
    }
    // function isValidUUID(uuid: string) {
    //     const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    //     return uuidPattern.test(uuid);
    // }
    // if (isValidUUID(doctorId)) {
    //     console.log('valid')
    // } else {
    //     console.log('invalid')
    // }
    // console.log(doct.dataValues.id)
    try {
        const report = await report_1.Report.create({
            patientId: newid,
            patientName,
            age,
            hospitalName,
            weight,
            height,
            bloodGroup,
            genotype,
            bloodPressure,
            hiv_status,
            hepatitis,
            doctorId: doct._id
        });
        res.status(201).json({
            message: 'Report added successfully',
            data: {
                report
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
}
exports.createReport = createReport;
async function getAllReports(req, res) {
    console.log("calling getAllReports");
    const id = req.params.id;
    console.log(id);
    const reportId = req.params.reportId;
    if (id === 'administrator') {
        try {
            const allReports = await report_1.Report.find({ attributes: ["patientId", "patientName", "age", "hospitalName", "weight", "height", "bloodGroup", "genotype", "bloodPressure", "hiv_status", "hepatitis"] });
            if (allReports.length > 0) {
                res.json({
                    data: allReports
                });
            }
            else {
                res.json({ message: 'No Reports found' });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                error: err
            });
        }
    }
    else {
        try {
            const thisReport = await report_1.Report.findOne({
                where: { patientId: reportId },
                attributes: ["patientId", "patientName", "age", "hospitalName", "weight", "height", "bloodGroup", "genotype", "bloodPressure", "hiv_status", "hepatitis"]
            });
            if (thisReport) {
                return res.json({
                    data: thisReport
                });
            }
            res.status(404).json({
                message: 'Report not found'
            });
        }
        catch (err) {
            res.status(500).json({
                error: err
            });
        }
    }
}
exports.getAllReports = getAllReports;
async function deleteReport(req, res) {
    console.log("calling deleteReport");
    const id = req.params.id;
    try {
        const thisReport = await report_1.Report.findOne({ where: { patientId: id } });
        if (thisReport) {
            await thisReport.deleteOne();
            res.json({
                message: 'Report removed'
            });
        }
        else {
            res.status(404).json({
                error: 'Report not found'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.deleteReport = deleteReport;
async function updateReport(req, res) {
    console.log("calling updateReport");
    const id = req.params._id;
    try {
        const thisReport = await report_1.Report.findOne({
            where: { patientId: id }
        });
        const updates = undefined || {};
        const { patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis } = req.body;
        if (patientName) {
            updates.patientName = patientName;
        }
        if (age) {
            updates.age = age;
        }
        if (hospitalName) {
            updates.hospitalName = hospitalName;
        }
        if (weight) {
            updates.weight = weight;
        }
        if (height) {
            updates.height = height;
        }
        if (bloodGroup) {
            updates.bloodGroup = bloodGroup;
        }
        if (genotype) {
            updates.genotype = genotype;
        }
        if (bloodPressure) {
            updates.bloodPressure = bloodPressure;
        }
        if (HIV_status) {
            updates.HIV_status = HIV_status;
        }
        if (hepatitis) {
            updates.hepatitis = hepatitis;
        }
        if (thisReport) {
            if (updates) {
                await thisReport.updateOne(updates);
                console.log('Report updated');
                const updateReport = await report_1.Report.findOne({
                    where: { patientId: id },
                    attributes: ["patientId", "patientName", "age", "hospitalName", "weight", "height", "bloodGroup", "genotype", "bloodPressure", "HIV_status", "hepatitis"]
                });
                res.json({
                    data: updateReport
                });
            }
            else {
                res.json({
                    message: 'No new record to update'
                });
            }
        }
        else {
            res.status(404).json({
                error: 'Report not found'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.updateReport = updateReport;
