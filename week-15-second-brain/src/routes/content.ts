import express from "express";
import { Content } from "../db";
import {
	validateContentInputs,
	validateContentUpdateInputs,
} from "../middlewares/validate";
import { AuthRequest } from "../middlewares/authenticate";

const contentRouter = express.Router();

contentRouter.post("/", validateContentInputs, async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const { type, link, title, tags } = req.body;
		await Content.create({ type, link, title, tags, userId });
		res.status(201).json({ msg: "Content created successfully" });
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

contentRouter.get("/", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const contents = await Content.find({ userId })
			.populate("userId", "username")
			.populate("tags");
		res.status(200).json(contents);
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

contentRouter.get("/:id", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const content = await Content.findOne({
			_id: req.params.id,
			userId,
		})
			.populate("userId", "username")
			.populate("tags");
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

contentRouter.put("/:id", validateContentUpdateInputs, async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const updates = req.body;
		//this takes 3 args, first condition to find doc, then updates, then options, they all are objects and $set se basically hum jo jo dete h use update kr deta h db agr hum normally dege to poora doc hi replace hoke wo bn jaega
		const content = await Content.findOneAndUpdate(
			{ _id: req.params.id, userId },
			{ $set: updates },
			{ new: true }
		);
		if (!content) {
			throw new Error("Content not found or its not yours");
		}
		res.status(200).json({ msg: "Content updated successfully", content });
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
});

contentRouter.delete("/:id", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const content = await Content.findOneAndDelete({
			_id: req.params.id,
			userId,
		});
		if (!content) {
			throw new Error("Content not found or its not yours");
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

export default contentRouter;
