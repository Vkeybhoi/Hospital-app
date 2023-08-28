import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { doctors } from "../models/doctors";

const token = process.env.JWT_SECRET as string;

export async function Auth(req: Request | any, res: Response, next: NextFunction) {
    console.log('calling auth')
    try {
        const jwtToken = req.cookies.token; // Get JWT from cookies
        
        if (!jwtToken) {
            return res.status(403).json({ error: "Kindly sign in as a user" });
        }
    
        let verified = Jwt.verify(jwtToken, token);

        if (!verified) {
            return res
                .status(401)
                .json({ error: "Token invalid, you can't access this route" });
        }

        const { id } = verified as { [key: string]: string };
        const user = await doctors.findOne({ _id: id });

        if (!user) {
            return res.status(401).json({ error: "Kindly sign in as a user" });
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: "User not logged in" });
    }
}


  