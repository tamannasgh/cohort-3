import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { authenticateUser } from "./middlewares/authenticate";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";

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
