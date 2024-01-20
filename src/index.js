import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import { userRouter } from './routes/users.js';
import { userTasksRouter } from "./routes/userTasks.js";

dotenv.config();


const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", userRouter);
app.use("/mytasks", userTasksRouter);

//connect to MongoDB database
mongoose.connect("mongodb+srv://pankhuri:"+process.env.DB_PASSWORD+"@manager-db.rn0vt9p.mongodb.net/manager-db?retryWrites=true&w=majority")

app.listen(3001, () => console.log("Server running on port 3001..."))