import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { validateSignupInputs } from "./middlewares/validate";
import { User } from "./db";
import { authenticateUser, AuthRequest } from "./middlewares/authenticate";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Hello adddaa" });
});

app.post("/signup", validateSignupInputs, async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 5);
		await User.create({
			username,
			password: hashedPassword,
		});
		res.status(201).json({ msg: "User created successfully" });
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

app.post("/signin", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			throw new Error("User not found");
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}
		const token = jwt.sign(
			{ id: user._id },
			process.env.jwtSecret as string
		);
		res.status(200).json({ msg: "User signed in successfully", token });
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

app.use(authenticateUser);

app.post("/content", (req: AuthRequest, res) => {
	console.log(req.decodedToken);
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
