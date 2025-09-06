import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected Succesfully");
    });
};

export default connectDB;