import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { authenticateUser } from "./middlewares/authenticate";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import tagRouter from "./routes/tag";
import brainRouter from "./routes/share-brain";
import searchRouter from "./routes/search";
import { setupQDb } from "./services/qdrantService";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Hello adddaa" });
});

app.use("/user", userRouter);

app.use(authenticateUser);

app.use("/content", contentRouter);

app.use("/tag", tagRouter);

app.use("/brain", brainRouter);

app.use("/search", searchRouter);

//no route handler middleware
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

//db connection and starting server

async function setupProject() {
	try {
		await setupQDb();
		console.log("Qdrant Database connected");
		await mongoose.connect(process.env.MONGO_URL as string);
		console.log("Mongodb Database connected");
		app.listen(port, () => {
			console.log(`Server is running at http://localhost:${port}`);
		});
	} catch (e) {
		console.log(e);
	}
}

setupProject();
