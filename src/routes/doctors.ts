import express, {Request, Response, NextFunction} from 'express';
import { signup, signin, getAllDoctors } from "../controllers/doctors"
import {Auth} from "../middlewear/auth"


const router = express.Router();

/* GET users listing. */
router.post('/signup', signup);


router.post('/signin',  signin);

router.get('/ver/:id', Auth, getAllDoctors)




export default router;