import express from "express";
import { AuthRequest } from "../middlewares/authenticate";
import { v4 as uuidv4 } from "uuid";
import { Link, Content } from "../db";
import mongoose from "mongoose";

const brainRouter = express.Router();

interface brainLink extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
	hash: string;
	userId: {
		_id: mongoose.Types.ObjectId;
		username: string;
	};
}

brainRouter.post("/share", async (req, res) => {
	try {
		const userId = (req as AuthRequest).id;
		const share = req.body.share;

		if (share) {
			const link = await Link.findOne({ userId });
			if (link) {
				throw new Error(
					`You have already shared your brain, you can access at ${link.hash}`
				);
			}
			const hash = uuidv4();
			await Link.create({ hash, userId });
			res.status(200).json({ msg: "Shared brain", link: hash });
		} else {
			const link = await Link.findOneAndDelete({ userId });
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

//for now we can only read the brain
brainRouter.get("/:id", async (req, res) => {
	try {
		const hash = req.params.id;
		const link = await Link.findOne({ hash }).populate(
			"userId",
			"username"
		);
		//populate kr pare h hum kyunki ref set kiya tha user table ka
		console.log(link);

		if (!link) {
			throw new Error("No brain found");
		} else {
			const contents = await Content.find({
				userId: link.userId,
			})
				.populate("tags")
				.populate("userId", "username");
			const username = (link as unknown as brainLink).userId.username;
			res.status(200).json({ username, contents });
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
