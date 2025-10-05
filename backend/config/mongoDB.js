import mongoose from "mongoose";

const connectDB = async () => {
   await mongoose.connect(`${process.env.MONGODB_URI}/${"prescripto"}`)
   mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
   });
   mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error:', err);
   });
}   

export default connectDB;