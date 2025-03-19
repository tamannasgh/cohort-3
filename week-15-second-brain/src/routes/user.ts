import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateSignupInputs } from "../middlewares/validate";
import { User } from "../db";

const userRouter = express.Router();

userRouter.post("/signup", validateSignupInputs, async (req, res) => {
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

userRouter.post("/signin", async (req, res) => {
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
			process.env.JWT_SECRET as string
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

export default userRouter;
