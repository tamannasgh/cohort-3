import express from "express";
import { courseModel, purchaseModel } from "../db.js";
const courseRouter = express.Router();
import { coursePurchaseAuth } from "../middlewares/auth.js";

courseRouter.get("/", async (req, res) => {
	try {
		const courses = await courseModel.find({});
		if (courses.length < 1) {
			throw new Error("no courses yet available");
		}
		res.status(200).json({ courses });
	} catch (err) {
		res.status(404).json({ msg: err.message });
	}
});

courseRouter.get("/:id", async (req, res) => {
	try {
		const courseId = req.params.id;
		console.log(courseId);

		const course = await courseModel.findOne({ _id: courseId });
		if (!course) {
			throw new Error("course doesn't exists.");
		}
		res.status(200).json({ course });
	} catch (err) {
		res.status(404).json({ msg: err.message });
	}
});

courseRouter.post("/:id", coursePurchaseAuth, async (req, res) => {
	try {
		const courseId = req.params.id;
		const course = await courseModel.findOne({ _id: courseId });
		if (!course) {
			throw new Error("course doesn't exists.");
		}

		const buyerId = req.userId;
		if (course.creatorId.toString() === buyerId) {
			return res.status(200).json({ msg: "its your course alreadyy" });
		}

		const date = new Date();
		const purchase = await purchaseModel.create({
			date,
			courseId,
			buyerId,
		});
		res.status(201).json({ msg: "course purchased successfully" });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

export default courseRouter;
