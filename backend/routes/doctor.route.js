import express from "express";
import {
  appointmentCancel,
  appointmentCompleted,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorLogin,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import authDoctor from "../middleware/doctor.middleware.js";

const router = express.Router();

router.get("/list", doctorList);
router.post("/login", doctorLogin);
router.get("/appointments", authDoctor, appointmentsDoctor);
router.post("/complete-appointment", authDoctor, appointmentCompleted);
router.post("/cancel-appointment", authDoctor, appointmentCancel);
router.get("/dashboard", authDoctor, doctorDashboard);

router.get("/profile", authDoctor, doctorProfile);
router.post("/update-profile", authDoctor, updateDoctorProfile);

export default router;
