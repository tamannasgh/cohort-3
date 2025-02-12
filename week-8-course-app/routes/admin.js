import express from "express";
const adminRouter = express.Router();
import bcrypt from "bcrypt";
import {
	signupSchema,
	signinSchema,
	courseSchema,
	updateCourseSchema,
} from "../utils/validate.js";
import { adminModel, courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.js";
import dotenv from "dotenv/config";

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

adminRouter.post("/signup", async (req, res) => {
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
		const admin = await adminModel.create({
			name,
			email,
			password: hashedPassword,
		});
		res.status(201).json({ msg: "admin created successfully" });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

adminRouter.post("/signin", async (req, res) => {
	try {
		const validatedData = signinSchema.safeParse(req.body);
		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) =>
				console.log(err.message)
			);
			throw new Error("input validation failed");
		}

		const { email, password } = validatedData.data;

		const admin = await adminModel.findOne({ email: email });
		if (!admin) {
			throw new Error("admin not found");
		}

		const isPasswordValid = await bcrypt.compare(password, admin.password);
		if (!isPasswordValid) {
			throw new Error("password is not correct");
		}

		const token = jwt.sign({ id: admin._id }, JWT_ADMIN_SECRET);
		res.status(200).json({ msg: "success", token: token });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

adminRouter.use(authMiddleware(JWT_ADMIN_SECRET));

adminRouter.post("/course", async (req, res) => {
	try {
		const validatedData = courseSchema.safeParse(req.body);
		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) =>
				console.log(err.message)
			);
			throw new Error("input validation failed");
		}
		const creatorId = req.userId;
		const { title, des, price } = validatedData.data;
		const course = await courseModel.create({
			title,
			des,
			price,
			creatorId,
		});
		res.status(201).json({
			msg: "course created successfully",
			courseId: course._id,
		});
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

adminRouter.put("/course/:id", async (req, res) => {
	try {
		const creatorId = req.userId;
		const course = await courseModel.findById(req.params.id);

		if (course.creatorId.toString() !== creatorId) {
			throw new Error("you can't update someone else's course");
		}

		const validatedData = updateCourseSchema.safeParse(req.body);
		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) =>
				console.log(err.message)
			);
			throw new Error("input validation failed");
		}

		const updatedCourse = { ...course._doc, ...validatedData.data };

		await courseModel.findByIdAndUpdate(req.params.id, updatedCourse);

		res.status(201).json({
			msg: "course updated successfully",
			courseId: course._id,
		});
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

export default adminRouter;
