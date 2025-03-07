import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: "string", required: true, unique: true },
	password: { type: "string", required: true },
});

const User = mongoose.model("user", userSchema);

const tagSchema = new mongoose.Schema({
	name: { type: "string", required: true },
});

const Tag = mongoose.model("tag", tagSchema);

const contentSchema = new mongoose.Schema({
	type: {
		type: "string",
		required: true,
		enum: ["document", "tweet", "youtube", "link"],
	},
	link: { type: "string", required: true },
	title: { type: "string", required: true },
	tags: [{ type: mongoose.Types.ObjectId, ref: "tag" }],
	creatorId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

const Content = mongoose.model("content", contentSchema);

export { User, Tag, Content };
