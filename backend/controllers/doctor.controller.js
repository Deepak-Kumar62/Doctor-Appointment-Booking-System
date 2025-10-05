import Doctor from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.model.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await Doctor.findById(docId);

    await Doctor.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.status(200).json({ success: true, message: "Availablity changed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    console.log(doctor);
    if (!doctor) {
      res.status(400).json({ success: false, message: "Invlide credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invlide credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// api to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req;
    const appointments = await Appointment.find({ docId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// api to mark appointment completed for doctor panel
const appointmentCompleted = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment Completed" });
    } else {
      return res.status(400).json({ success: false, message: "Mark Faild" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// api to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Cancellation Faild" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req;
    const appointments = await Appointment.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const DashboardData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({ success: true, DashboardData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// api to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req;

    const profileData = await Doctor.findById(docId).select("-password");

    res.status(200).json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// api to update the doctor profile from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId } = req;
    const { fees, address, available } = req.body;

    await Doctor.findByIdAndUpdate(docId, { fees, address, available });

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export {
  changeAvailablity,
  doctorList,
  doctorLogin,
  appointmentsDoctor,
  appointmentCompleted,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
