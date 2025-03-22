import express from "express";
import mongoose from "mongoose";
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
		let { type, link, title, tags } = req.body;
		const contentAlreadyExists = await Content.findOne({ userId, link });
		if (contentAlreadyExists) {
			throw new Error("Content already exists with this link.");
		}

		//map mei directly String (function h ye) likhne ka mtlb hua ki ab hr tag string mei convert hoke milega
		// Ensure `tags` is an array before processing
		if (Array.isArray(tags)) {
			tags = [...new Set(tags.map(String))].map(
				(id) => new mongoose.Types.ObjectId(id)
			);
		} else {
			tags = []; // If tags are not provided, set an empty array
		}

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
		if (updates.link) {
			const contentAlreadyExists = await Content.findOne({
				userId,
				link: updates.link,
			});
			if (contentAlreadyExists) {
				throw new Error("Content already exists with this link");
			}
		}
		if (updates.tags && Array.isArray(updates.tags)) {
			updates.tags = [...new Set(updates.tags.map(String))].map(
				(id) => new mongoose.Types.ObjectId(id as string)
			);
		}

		//this takes 3 args, first condition to find doc, then updates, then options, they all are objects and $set se basically hum jo jo dete h use update kr deta h db agr hum normally denge to poora doc hi replace hoke wo bn jaega or new true krne se return krega updated doc
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
