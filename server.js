import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is up and running at port http://localhost:${process.env.PORT || 4000}`);
    connectDB();
})