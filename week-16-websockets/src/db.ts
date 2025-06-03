import mongoose from "mongoose";
import "dotenv/config";

async function dbSetup() {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		console.log("db is connected");
	} catch (err) {
		console.log("error while connecting to db, ", err);
	}
}

export default dbSetup;
