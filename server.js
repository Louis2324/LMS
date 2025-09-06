import express from "express";
const app = express();


const server = app.listen(5000,()=>{
    console.log("Server is up and running");
})