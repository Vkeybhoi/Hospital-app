import express from 'express';
import { createReport, deleteReport, getAllReports, updateReport } from "../controllers/report"
import {Auth} from "../middlewear/auth"
const router = express.Router();


router.post('/ver/:id/report', Auth, createReport)

router.get('/ver/:id/report/:reportId', Auth, getAllReports)

router.get('/ver/:id/report/:reportId',Auth, deleteReport )

router.get('/ver/:id/report/:reportId', Auth, updateReport)


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default  router;
