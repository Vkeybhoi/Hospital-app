import { Response, Request, NextFunction } from 'express';
import { doctors } from '../models/doctors';
import { Report} from '../models/report'



export async function createReport(req: Request, res: Response) {
    console.log("calling createReport")
    const doctorId = req.params.id;
    const { patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, hiv_status, hepatitis} = req.body;
    try {
        
    
        // Assuming you have a doctor instance
        const doctor = await doctors.findById(doctorId)
        if(!doctor){
            return res.status(401).json({ message: 'Invalid credentials.' });
            //reject the request
        }

        const newReport = await Report.create({
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
            doctorId
        });
        doctor.reports.push(newReport._id); // Add the new report's ObjectId to the doctor's reports array
        await doctor.save();
    
        console.log("Report and doctor's reports updated:", newReport, doctorId);
    } catch (error) {
        console.error("Error creating report:", error);
    }
   
}
export async function getAllReports(req: Request, res: Response) {
    console.log("calling getAllReports")
    const id = req.params.id
    console.log(id)
    const reportId = req.params.reportId
    if (id === 'administrator') {
        try {
            const allReports = await Report.find(
                { attributes: ["patientId", "patientName", "age", "hospitalName", "weight", "height", "bloodGroup", "genotype", "bloodPressure", "hiv_status", "hepatitis"] },
               
            )
            if (allReports.length > 0) {
                res.json({
                    data: allReports
                })
            } else {
                res.json({ message: 'No Reports found' })
            }
        }
        catch (err) {
            console.error(err)
            res.status(500).json({
                error: err
            })
        }
    } else {
        try {
            const thisReport = await Report.findOne({
                where: { patientId: reportId },
                attributes: ["patientId", "patientName", "age", "hospitalName", "weight", "height", "bloodGroup", "genotype", "bloodPressure", "hiv_status", "hepatitis"]
            })
            if (thisReport) {
                return res.json({
                    data: thisReport
                })
            }
            res.status(404).json({
                message: 'Report not found'
            })
        }
        catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }
}
export async function deleteReport(req: Request, res: Response) {
    console.log("calling deleteReport")
    const id = req.params._id
    try {
        const thisReport = await Report.findOne(
             { patientId: id } 
        )
        if (thisReport) {
            await thisReport.deleteOne()
            res.json({
                message: 'Report removed'
            })
        } else {
            res.status(404).json({
                error: 'Report not found'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}
export async function updateReport(req: Request, res: Response) {
    console.log("calling updateReport")
    const id = req.params._id
    try {
        const thisReport = await Report.findOne({ patientId: id })
        const updates: {
            patientName?: string;
            age?: string;
            hospitalName?: string;
            weight?: string;
            height?: string;
            bloodGroup?: string;
            genotype?: string;
            bloodPressure?: string;
            HIV_status?: string;
            hepatitis?: string;
        } = undefined || {}
        const {
            patientName,
            age,
            hospitalName,
            weight,
            height,
            bloodGroup,
            genotype,
            bloodPressure,
            HIV_status,
            hepatitis
        } = req.body
        if (patientName) {
            updates.patientName = patientName

        }
        if (age) {
            updates.age = age
        }
        if (hospitalName) {
            updates.hospitalName = hospitalName
        }
        if (weight) {
            updates.weight = weight
        }
        if (height) {
            updates.height = height
        }
        if (bloodGroup) {
            updates.bloodGroup = bloodGroup
        }
        if (genotype) {
            updates.genotype = genotype
        }
        if (bloodPressure) {
            updates.bloodPressure = bloodPressure
        }
        if (HIV_status) {
            updates.HIV_status = HIV_status
        }
        if (hepatitis) {
            updates.hepatitis = hepatitis
        }
        if (thisReport) {
            if (updates) {
                await thisReport.updateOne(updates)
                console.log('Report updated')
                const updateReport = await Report.findOne( { patientId: id })
                res.json({
                    data: updateReport
                })
            } else {
                res.json({
                    message: 'No new record to update'
                })
            }
        } else {

            res.status(404).json({
                error: 'Report not found'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

