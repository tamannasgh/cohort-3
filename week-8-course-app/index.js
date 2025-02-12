import express from "express";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import courseRouter from "./routes/course.js";
import mongoose from "mongoose";
import dotenv from "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

mongoose
	.connect(process.env.mongoUrl)
	.then(() => {
		app.listen(3000, () => console.log("app is up and running"));
	})
	.catch(() => console.log("database is not connected"));
