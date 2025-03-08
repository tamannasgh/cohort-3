import express from "express";
import { Content } from "../db";
import { validateContentInputs } from "../middlewares/validate";
import { AuthRequest } from "../middlewares/authenticate";

const contentRouter = express.Router();

contentRouter.post("/", validateContentInputs, async (req, res) => {
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

contentRouter.get("/", async (req, res) => {
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

contentRouter.get("/:id", async (req, res) => {
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

contentRouter.delete("/:id", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const content = await Content.findOneAndDelete({
			_id: req.params.id,
			creatorId: userId,
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
