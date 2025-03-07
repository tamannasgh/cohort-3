import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
	validateContentInputs,
	validateSignupInputs,
} from "./middlewares/validate";
import { Content, User } from "./db";
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

app.post("/content", validateContentInputs, async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const { type, link, title, tags } = req.body;
		await Content.create({ type, link, title, tags, creatorId: userId });
		res.status(201).json({ msg: "Content created successfully" });
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

app.get("/content", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const contents = await Content.find({ creatorId: userId }).populate(
			"creatorId",
			"username"
		);
		res.status(200).json(contents);
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

app.get("/content/:id", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const content = await Content.findOne({
			_id: req.params.id,
			creatorId: userId,
		}).populate("creatorId", "username");
		if (!content) {
			throw new Error("Content not found or its not yours");
		}
		res.status(200).json(content);
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

app.delete("/content/:id", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const content = await Content.findOneAndDelete({
			_id: req.params.id,
			creatorId: userId,
		});
		if (!content) {
			throw new Error("Content not found");
		}
		res.status(200).json({ msg: "Content deleted successfully" });
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
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
