import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointment,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/user.controller.js";

import authUser from "../middleware/user.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// POST request for user registration
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/get-profile", authUser, getProfile);
router.post("/update-profile", upload.single("image"), authUser, updateProfile);
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, listAppointment);

router.post("/cancel-appointment", authUser, cancelAppointment);
// router.post("/payment-razorpay",authUser,paymentRazorpay);
// router.post("/verifyRazorpay",authUser,verifyRazorpay);

export default router;
