import { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "../validators/auth.schema";
import signupUser from "../core/auth/signup";
import checkCredentials from "../core/auth/checkCredentials";
import { getJwtToken } from "../core/auth/jwt";

async function signupController(req: Request, res: Response) {
	try {
		const data = SignupSchema.parse(req.body);
		console.log(data);
		const user = await signupUser(data);
		res.status(201).send({ msg: "user created", data: { user } });
	} catch (err: any) {
		console.log("error: ", err);
		res.status(400).send({
			msg: "error occured",
			error: err.message || "something went wrong",
		});
	}
}

async function signinController(req: Request, res: Response) {
	try {
		const data = SigninSchema.parse(req.body);
		await checkCredentials(data);
		const token = getJwtToken({ username: data.username });

		res.status(200).send({
			msg: "logged in succesfully.",
			data: { token },
		});
	} catch (err: any) {
		console.log("error: ", err);
		res.status(400).send({
			msg: "error occured",
			error: err.message || "something went wrong",
		});
	}
}

export { signupController, signinController };
