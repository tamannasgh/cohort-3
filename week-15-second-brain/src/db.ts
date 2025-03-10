import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: "string", required: true, unique: true },
	password: { type: "string", required: true },
});

const User = mongoose.model("user", userSchema);

const tagSchema = new mongoose.Schema({
	name: { type: "string", required: true, unique: true },
});

const Tag = mongoose.model("tag", tagSchema);

const contentSchema = new mongoose.Schema({
	type: {
		type: "string",
		required: true,
		enum: ["document", "tweet", "youtube", "link"],
	},
	link: { type: "string", required: true, unique: true },
	title: { type: "string", required: true },
	tags: [
		{
			type: mongoose.Types.ObjectId,
			ref: "tag",
		},
	],
	userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

const Content = mongoose.model("content", contentSchema);

const publicBrainLink = new mongoose.Schema({
	hash: { type: "string", required: true, unique: true },
	userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

const Link = mongoose.model("link", publicBrainLink);

export { User, Tag, Content, Link };
