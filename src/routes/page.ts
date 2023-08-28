import express, {Request, Response, NextFunction} from 'express';
import { signup, signin, getAllDoctors } from "../controllers/doctors"
// import {Auth} from "../middlewear/auth"


const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.render("Home");
});             
router.get("/register", (req: Request, res: Response) => {
    res.render("register");
});
router.get("/login", (req: Request, res: Response) => {
    res.render("login"); 
});

router.get




export default router; 