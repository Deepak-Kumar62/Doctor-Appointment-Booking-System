import express from "express";
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from "../controllers/admin.controller.js";
import upload from "../middleware/multer.middleware.js";
import authAdmin from "../middleware/admin.middleware.js";
import { changeAvailablity } from "../controllers/doctor.controller.js";

const router = express.Router();

// Route for adding a doctor
router.post("/add-doctor",authAdmin, upload.single('image'), addDoctor);
router.post('/login', loginAdmin);
router.post('/all-doctors',authAdmin, allDoctors);
router.post('/change-availablity',authAdmin, changeAvailablity);
router.get('/appointments',authAdmin, appointmentsAdmin);
router.post('/appointment-cancel',authAdmin, appointmentCancel);
router.get('/dashboard',authAdmin, adminDashboard);

export default router;