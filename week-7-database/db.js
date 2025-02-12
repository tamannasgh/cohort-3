import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
});

const todoSchema = mongoose.Schema({
	des: String,
	done: Boolean,
	userId: ObjectId,
});

const User = mongoose.model("user", userSchema);
const Todo = mongoose.model("todo", todoSchema);

export { User, Todo };
