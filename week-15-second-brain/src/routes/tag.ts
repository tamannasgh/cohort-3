import express from "express";
import { Tag } from "../db";

const tagRouter = express.Router();

tagRouter.get("/", async (req, res) => {
	try {
		console.log(req.query);
		const tags = await Tag.find({
			name: { $regex: req.query.q, $options: "i" },
		});
		res.status(200).json(tags);
	} catch (e) {
		if (e instanceof Error) {
			res.status(400).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "unknown error occurred", error: e });
		}
	}
});

tagRouter.post("/", async (req, res) => {
	try {
		const tagName = req.body.tag;
		const newTag = await Tag.create({ name: tagName });
		res.status(201).json({ msg: "Tag created", tag: newTag });
	} catch (e) {
		if (e instanceof Error) {
			res.status(400).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "unknown error occurred", error: e });
		}
	}
});

export default tagRouter;
