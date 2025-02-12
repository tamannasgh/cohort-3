import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
});

const adminSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
});

const courseSchema = new mongoose.Schema({
	title: String,
	des: String,
	price: Number,
	creatorId: ObjectId, //the teacher who made the course and in our case it will be one of the admins
});

const purchaseSchema = new mongoose.Schema({
	date: Date,
	courseId: ObjectId,
	buyerId: ObjectId, //this could be user or admin.
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

export { userModel, adminModel, courseModel, purchaseModel };
