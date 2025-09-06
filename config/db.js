import mongoose from "mongoose";

const connectDB = async () => {
  try {
     mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected Succesfully");
    });
  } catch (error) {
    console.log(`Error Connecting to Database: ${error}`);
  }
};

export default connectDB;