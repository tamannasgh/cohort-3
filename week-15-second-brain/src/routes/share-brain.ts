import express from "express";
import { AuthRequest } from "../middlewares/authenticate";
import { v4 as uuidv4 } from "uuid";
import { Link, Content } from "../db";
import { Document } from "mongoose";

const brainRouter = express.Router();

interface brainLink extends Document {
	hash: string;
	ownerId: {
		_id: string;
		username: string;
	};
}

brainRouter.post("/share", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const share = req.body.share;

		if (share) {
			const link = await Link.findOne({ ownerId: userId });
			if (link) {
				throw new Error("You have already shared your brain");
			}
			const hash = uuidv4();
			await Link.create({ hash, ownerId: userId });
			res.status(200).json({ msg: "Shared brain", link: hash });
		} else {
			const link = await Link.findOneAndDelete({ ownerId: userId });
			if (!link) {
				throw new Error("No brain to delete");
			}
			res.status(200).json({ message: "your brain is persnal now." });
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(403).json({ message: err.message });
		} else {
			res.status(500).json({ message: "unkown error occurred" });
		}
	}
});

brainRouter.get("/:id", async (req, res) => {
	try {
		const hash = req.params.id;
		const link = await Link.findOne({ hash }).populate(
			"ownerId",
			"username"
		);
		console.log(link);

		if (!link) {
			throw new Error("No brain found");
		} else {
			const contents = await Content.find({
				creatorId: link.ownerId,
			});
			res.status(200).json({ contents });
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(500).json({ message: "unkown error occurred" });
		}
	}
});
export default brainRouter;
