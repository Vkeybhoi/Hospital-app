"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const report_1 = require("../controllers/report");
const auth_1 = require("../middlewear/auth");
const router = express_1.default.Router();
router.post('/ver/:id/report', auth_1.Auth, report_1.createReport);
router.get('/ver/:id/report/:reportId', auth_1.Auth, report_1.getAllReports);
router.get('/ver/:id/report/:reportId', auth_1.Auth, report_1.deleteReport);
router.get('/ver/:id/report/:reportId', auth_1.Auth, report_1.updateReport);
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
exports.default = router;
