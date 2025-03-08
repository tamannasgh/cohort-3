import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { authenticateUser } from "./middlewares/authenticate";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import tagRouter from "./routes/tag";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Hello adddaa" });
});

app.use("/user", userRouter);

app.use(authenticateUser);

app.use("/content", contentRouter);

app.use("/tag", tagRouter);

//no route handler middleware
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});
//db connection and starting server

mongoose
	.connect(process.env.mongoUrl as string)
	.then(() => {
		app.listen(port, () => {
			console.log("Database connected");
			console.log(`Server is running at http://localhost:${port}`);
		});
	})
	.catch((e) => console.log(e));
