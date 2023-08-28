import { Response, Request, NextFunction } from 'express';
import { doctors } from '../models/doctors';
import bcrypt from 'bcrypt'
import { signupSchema, signinSchema, options } from '../utils/utils';
import Jwt from 'jsonwebtoken';




export async function signup(req: Request, res: Response) {
    console.log("calling signup")
    const result = signupSchema.validate(req.body, options);
    if (result.error) {
        return res.status(400).json({ message: result.error.message });
    }
    const { name, password, email, specialisation, gender, phoneNumber } = req.body;
    try{
        const existing = await doctors.findOne({email})
        if(!existing){
            const user = await doctors.create({
                password,
                name,
                email,
                specialisation,
                gender,
                phoneNumber
            })
            
            // Give the user a token
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
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
            return
        }

        res.status(400).json({message: "user already exists"})
        
    }
    catch(err){
        res.status(500).json({message: "server error", error: err})
    }

}


export async function signin(req: Request, res: Response) {
    
    try {
        console.log("calling signin")

    const result = signinSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({ message: result.error.message });
    }
    const { email, password } = req.body;

   
        const user = await doctors.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'in valid login details' });
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

  

// Give the user a token
const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

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
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }

}

export async function getAllDoctors(req: Request, res: Response) {
    console.log("calling getAllDoctors")
    const id = req.params.id
    if (id === 'administrator') {
        try {
            const allDoctors = await doctors.find()

            if (allDoctors.length > 0) {
                res.json({
                    data: allDoctors
                })
            } else {
                res.json({ message: 'No Doctors found' })
            }
        }
        catch (err) {
            res.status(500).json({
                error: err
            })
        }
    } else {
        try {
            const thisDoctor = await doctors.findOne({ _id: id })
            if (thisDoctor) {
                return res.json({
                    data: thisDoctor
                })
            }
            res.status(404).json({
                message: 'doctor not found'
            })
        }

        catch (err) {
            console.error(err)
            res.status(500).json({
                error: err
            })
        }
    }
}



