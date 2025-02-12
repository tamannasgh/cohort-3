import express from "express";
const userRouter = express.Router();
import bcrypt from "bcrypt";
import { userModel, purchaseModel, courseModel } from "../db.js";
import { signupSchema, signinSchema } from "../utils/validate.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.js";
import dotenv from "dotenv/config";

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

userRouter.post("/signup", async (req, res) => {
	try {
		const validatedData = signupSchema.safeParse(req.body);
		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) =>
				console.log(err.message)
			);
			throw new Error("input validation failed");
		}
		const { name, email, password } = validatedData.data;
		const hashedPassword = await bcrypt.hash(password, 5);
		const user = await userModel.create({
			name,
			email,
			password: hashedPassword,
		});
		res.status(201).json({ msg: "user created successfully" });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

userRouter.post("/signin", async (req, res) => {
	try {
		const validatedData = signinSchema.safeParse(req.body);
		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) =>
				console.log(err.message)
			);
			throw new Error("input validation failed");
		}

		const { email, password } = validatedData.data;

		const user = await userModel.findOne({ email: email });
		if (!user) {
			throw new Error("user not found");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error("password is not correct");
		}

		const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);
		res.status(200).json({ msg: "success", token: token });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

userRouter.use(authMiddleware(JWT_USER_SECRET));

userRouter.get("/my-courses", async (req, res) => {
	try {
		const userId = req.userId;

		const purchases = await purchaseModel.find({ buyerId: userId });
		if (purchases.length < 1) {
			throw new Error("you bought no courses yet");
		}

		const courseIds = purchases.map((purchase) => purchase.courseId);

		const courses = [];

		for (const courseId of courseIds) {
			courses.push(await courseModel.findById(courseId));
		}

		res.status(200).json({ courses });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

export default userRouter;
