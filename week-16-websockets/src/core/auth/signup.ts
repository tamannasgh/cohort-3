import User from "../../models/user.model";
import { SignupSchema } from "../../validators/auth.schema";
import { z } from "zod/v4";
import bcrypt from "bcrypt";

type signupInput = z.infer<typeof SignupSchema>;

async function signupUser(data: signupInput) {
	try {
		let userExist = await User.findOne({ username: data.username });
		if (userExist) throw new Error(`${data.username} already exists.`);
		userExist = await User.findOne({ email: data.email });
		if (userExist) throw new Error(`${data.email} already in use.`);

		const hashedPassword = await bcrypt.hash(data.password, 5);

		const user = await User.create({
			name: data.name,
			email: data.email,
			username: data.username,
			password: hashedPassword,
		});
		console.log(user);
		return {
			name: user.name,
			email: user.email,
			username: user.username,
		};
	} catch (err) {
		console.log("error occured: ", err);
		throw err; //re throwing error
	}
}

export default signupUser;
