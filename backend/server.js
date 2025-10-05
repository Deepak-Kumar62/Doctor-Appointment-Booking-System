import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://doctor-appointment-booking-system3.netlify.app",
      "https://doctor-appointment-booking-system1.netlify.app",
    ],
    credentials: true,
  })
);


app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

connectCloudinary();
