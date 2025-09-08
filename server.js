import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import { errorHandler,notFound } from "./middleware/errorHandler.js";
import { disableOverDueUsers } from "./controllers/userController.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/books",bookRouter);

app.use(notFound);
app.use(errorHandler);

setInterval(()=>{
    disableOverDueUsers()
     .then(()=>console.log("Checked for overdue users"))
     .catch(err => console.error("Error disabling overdue users:", err));
});
app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is up and running at http://localhost:${process.env.PORT || 4000}`);
    connectDB();
})