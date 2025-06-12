import { SigninSchema } from "../../validators/auth.schema";
import { z } from "zod/v4";
import bcrypt from "bcrypt";
import User from "../../models/user.model";

type signinInput = z.infer<typeof SigninSchema>;

async function checkCredentials(data: signinInput) {
	try {
		let user = await User.findOne({ username: data.username });
		if (!user) throw new Error(`${data.username} doesn't exists.`);
		const isPasswordCorrect = await bcrypt.compare(
			data.password,
			user.password!
		);
		if (!isPasswordCorrect) throw new Error("password is incorrect.");
		return true;
	} catch (err) {
		console.log("error occured: ", err);
		throw err;
	}
}

export default checkCredentials;
