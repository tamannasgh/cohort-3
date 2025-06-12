import { verifyJwtToken } from "../core/auth/jwt";
import express from "express";

function authMiddleware(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	try {
		console.log("heyyy");

		const token = req.headers.authorization;
		if (!token) throw new Error("jwt must be provided.");
		const data = verifyJwtToken(token);
		console.log(data);
		next();
	} catch (err: any) {
		console.log("error: ", err);
		res.status(400).send({
			msg: "error occured",
			error: err.message || "something went wrong",
		});
	}
}

export default authMiddleware;
