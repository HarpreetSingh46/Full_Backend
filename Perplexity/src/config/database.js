import mongoose from 'mongoose';


function connectDB() {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Server connection successfully");
}


export default connectDB;